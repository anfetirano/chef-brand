"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConnectionState,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  TrackLoop,
  TrackToggle,
  useConnectionState,
  useParticipants,
  useRoomContext,
  useTracks,
  DisconnectButton,
} from "@livekit/components-react";
import type { LocalUserChoices } from "@livekit/components-core";
import { ConnectionState as LiveKitConnectionState, Track } from "livekit-client";
import styles from "./creative-room.module.css";

type Credentials = { token: string; serverUrl: string };

type CreativeRoomProps = {
  roomId: string;
  invitation: string;
};

const references = [
  { title: "Cocina de origen", type: "Portada", tone: "dark" },
  { title: "Sobre mí", type: "Presentación", tone: "light" },
  { title: "Selección de platos", type: "Galería", tone: "gallery" },
  { title: "Trayectoria", type: "Experiencia", tone: "light" },
];

type DeviceInventory = {
  microphones: MediaDeviceInfo[];
  cameras: MediaDeviceInfo[];
};

const emptyInventory: DeviceInventory = { microphones: [], cameras: [] };

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop());
}

function mediaErrorMessage(error: unknown) {
  if (!(error instanceof DOMException)) {
    return "No se pudo comprobar la cámara y el micrófono.";
  }

  if (error.name === "NotAllowedError" || error.name === "SecurityError") {
    return "Chrome no tiene permiso para usar la cámara o el micrófono. Puedes reintentarlo o entrar como observador.";
  }

  if (error.name === "NotFoundError" || error.name === "OverconstrainedError") {
    return "El dispositivo seleccionado ya no está disponible. Hemos actualizado las opciones de entrada.";
  }

  if (error.name === "NotReadableError") {
    return "Otro programa está utilizando la cámara o el micrófono. Ciérralo o entra sin ese dispositivo.";
  }

  return "No se pudo iniciar el dispositivo seleccionado. Puedes elegir otro o entrar como observador.";
}

function DeviceAwarePreJoin({
  onSubmit,
  isJoining,
  externalError,
}: {
  onSubmit: (choices: LocalUserChoices) => void;
  isJoining: boolean;
  externalError: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [inventory, setInventory] = useState<DeviceInventory>(emptyInventory);
  const [username, setUsername] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioDeviceId, setAudioDeviceId] = useState("");
  const [videoDeviceId, setVideoDeviceId] = useState("");
  const [deviceError, setDeviceError] = useState("");
  const [isCheckingDevices, setIsCheckingDevices] = useState(true);

  const readInventory = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      setInventory(emptyInventory);
      return emptyInventory;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const nextInventory = {
      microphones: devices.filter((device) => device.kind === "audioinput"),
      cameras: devices.filter((device) => device.kind === "videoinput"),
    };
    setInventory(nextInventory);
    return nextInventory;
  }, []);

  const applyStream = useCallback(async (
    wantsAudio: boolean,
    wantsVideo: boolean,
    requestedAudioId = "",
    requestedVideoId = "",
  ) => {
    if (!wantsAudio && !wantsVideo) {
      stopStream(streamRef.current);
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
      setAudioEnabled(false);
      setVideoEnabled(false);
      return true;
    }

    const constraints: MediaStreamConstraints = {
      audio: wantsAudio
        ? requestedAudioId
          ? { deviceId: { exact: requestedAudioId } }
          : true
        : false,
      video: wantsVideo
        ? requestedVideoId
          ? { deviceId: { exact: requestedVideoId } }
          : true
        : false,
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      stopStream(streamRef.current);
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;

      const audioTrack = stream.getAudioTracks()[0];
      const videoTrack = stream.getVideoTracks()[0];
      setAudioEnabled(Boolean(audioTrack));
      setVideoEnabled(Boolean(videoTrack));
      setAudioDeviceId(audioTrack?.getSettings().deviceId ?? "");
      setVideoDeviceId(videoTrack?.getSettings().deviceId ?? "");
      setDeviceError("");
      await readInventory();
      return true;
    } catch (error) {
      setDeviceError(mediaErrorMessage(error));
      await readInventory();
      return false;
    }
  }, [readInventory]);

  const checkDevices = useCallback(async () => {
    setIsCheckingDevices(true);
    setDeviceError("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setDeviceError("Este navegador no permite acceder a cámara y micrófono. Puedes entrar como observador.");
      setIsCheckingDevices(false);
      return;
    }

    if (await applyStream(true, true)) {
      setIsCheckingDevices(false);
      return;
    }

    if (await applyStream(true, false)) {
      setDeviceError("No se encontró una cámara disponible. Puedes entrar solo con micrófono.");
      setIsCheckingDevices(false);
      return;
    }

    if (await applyStream(false, true)) {
      setDeviceError("No se encontró un micrófono disponible. Puedes entrar solo con cámara.");
      setIsCheckingDevices(false);
      return;
    }

    await applyStream(false, false);
    setDeviceError("No se encontraron dispositivos disponibles. Puedes entrar como observador.");
    setIsCheckingDevices(false);
  }, [applyStream]);

  useEffect(() => {
    const initialization = window.setTimeout(() => void checkDevices(), 0);
    const handleDeviceChange = () => void readInventory();
    navigator.mediaDevices?.addEventListener?.("devicechange", handleDeviceChange);

    return () => {
      window.clearTimeout(initialization);
      navigator.mediaDevices?.removeEventListener?.("devicechange", handleDeviceChange);
      stopStream(streamRef.current);
    };
  }, [checkDevices, readInventory]);

  async function changeMedia(
    nextAudioEnabled: boolean,
    nextVideoEnabled: boolean,
    nextAudioDeviceId = audioDeviceId,
    nextVideoDeviceId = videoDeviceId,
  ) {
    const succeeded = await applyStream(
      nextAudioEnabled,
      nextVideoEnabled,
      nextAudioDeviceId,
      nextVideoDeviceId,
    );

    if (!succeeded && (nextAudioDeviceId || nextVideoDeviceId)) {
      await applyStream(nextAudioEnabled, nextVideoEnabled);
    }
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = username.trim();
    if (!name || isJoining) return;

    stopStream(streamRef.current);
    streamRef.current = null;
    onSubmit({
      username: name,
      audioEnabled,
      videoEnabled,
      audioDeviceId,
      videoDeviceId,
    });
  }

  const observerMode = !audioEnabled && !videoEnabled;

  return (
    <form className={styles.devicePrejoin} onSubmit={submit}>
      <div className={styles.previewFrame} data-camera-enabled={videoEnabled}>
        <video ref={videoRef} autoPlay muted playsInline />
        {!videoEnabled ? (
          <div className={styles.observerPreview}>
            <span aria-hidden="true">○</span>
            <p>{observerMode ? "Modo observador" : "Cámara apagada"}</p>
          </div>
        ) : null}
      </div>

      <div className={styles.deviceControls}>
        <label className={styles.nameField}>
          <span>Tu nombre</span>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="off"
            maxLength={50}
            required
          />
        </label>

        <div className={styles.deviceRow}>
          <label>
            <span>Micrófono</span>
            <select
              value={audioDeviceId}
              disabled={inventory.microphones.length === 0 || isCheckingDevices}
              onChange={(event) => {
                const nextId = event.target.value;
                setAudioDeviceId(nextId);
                void changeMedia(true, videoEnabled, nextId, videoDeviceId);
              }}
            >
              {inventory.microphones.length === 0 ? <option value="">No disponible</option> : null}
              {inventory.microphones.map((device, index) => (
                <option value={device.deviceId} key={device.deviceId || `microphone-${index}`}>
                  {device.label || `Micrófono ${index + 1}`}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-pressed={audioEnabled}
            disabled={inventory.microphones.length === 0 || isCheckingDevices}
            onClick={() => void changeMedia(!audioEnabled, videoEnabled)}
          >
            {audioEnabled ? "Silenciar" : "Activar"}
          </button>
        </div>

        <div className={styles.deviceRow}>
          <label>
            <span>Cámara</span>
            <select
              value={videoDeviceId}
              disabled={inventory.cameras.length === 0 || isCheckingDevices}
              onChange={(event) => {
                const nextId = event.target.value;
                setVideoDeviceId(nextId);
                void changeMedia(audioEnabled, true, audioDeviceId, nextId);
              }}
            >
              {inventory.cameras.length === 0 ? <option value="">No disponible</option> : null}
              {inventory.cameras.map((device, index) => (
                <option value={device.deviceId} key={device.deviceId || `camera-${index}`}>
                  {device.label || `Cámara ${index + 1}`}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            aria-pressed={videoEnabled}
            disabled={inventory.cameras.length === 0 || isCheckingDevices}
            onClick={() => void changeMedia(audioEnabled, !videoEnabled)}
          >
            {videoEnabled ? "Apagar" : "Activar"}
          </button>
        </div>

        <div className={styles.joinActions}>
          <button type="button" onClick={() => void checkDevices()} disabled={isCheckingDevices || isJoining}>
            {isCheckingDevices ? "Comprobando…" : "Reintentar dispositivos"}
          </button>
          <button className={styles.joinButton} type="submit" disabled={!username.trim() || isJoining}>
            {isJoining ? "Conectando…" : observerMode ? "Entrar como observador" : "Entrar en la reunión"}
          </button>
        </div>

        {deviceError || externalError ? (
          <p className={styles.deviceMessage} role="status">{externalError || deviceError}</p>
        ) : null}
      </div>
    </form>
  );
}

function CameraIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 10l4.6-2.7c.6-.4 1.4.1 1.4.8v7.8c0 .7-.8 1.2-1.4.8L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" /></svg>;
}

function MicIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15a4 4 0 004-4V6a4 4 0 00-8 0v5a4 4 0 004 4zm7-4a7 7 0 01-14 0m7 7v4m-4 0h8" /></svg>;
}

function LeaveIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 17l5-5-5-5m5 5H3m11-9h5a2 2 0 012 2v14a2 2 0 01-2 2h-5" /></svg>;
}

function VideoPanel() {
  const tracks = useTracks([
    { source: Track.Source.Camera, withPlaceholder: true },
  ]);
  const participants = useParticipants();
  const connectionState = useConnectionState();

  return (
    <section className={styles.meetingPanel} aria-label="Videollamada">
      <div className={styles.meetingHeading}>
        <div>
          <h2>Reunión</h2>
          <p>{participants.length}/2 participantes</p>
        </div>
        <span className={styles.connection} data-state={connectionState}>
          <ConnectionState />
        </span>
      </div>

      <div className={styles.videoGrid} data-count={participants.length}>
        <TrackLoop tracks={tracks}>
          <ParticipantTile />
        </TrackLoop>
        {participants.length < 2 ? (
          <div className={styles.waiting}>Esperando al segundo participante…</div>
        ) : null}
      </div>

      <div className={styles.callControls}>
        <TrackToggle source={Track.Source.Microphone} aria-label="Activar o silenciar micrófono">
          <MicIcon />
        </TrackToggle>
        <TrackToggle source={Track.Source.Camera} aria-label="Activar o apagar cámara">
          <CameraIcon />
        </TrackToggle>
        <DisconnectButton aria-label="Salir de la reunión">
          <LeaveIcon />
        </DisconnectButton>
      </div>
    </section>
  );
}

function InitialMediaPublisher({
  choices,
  onError,
}: {
  choices: LocalUserChoices;
  onError: (message: string) => void;
}) {
  const room = useRoomContext();
  const connectionState = useConnectionState();
  const hasPublished = useRef(false);

  useEffect(() => {
    if (
      connectionState !== LiveKitConnectionState.Connected ||
      hasPublished.current
    ) {
      return;
    }

    hasPublished.current = true;
    const participant = room.localParticipant;

    async function enableMicrophone() {
      if (!choices.audioEnabled) return;

      try {
        await participant.setMicrophoneEnabled(true, {
          ...(choices.audioDeviceId ? { deviceId: choices.audioDeviceId } : {}),
        });
      } catch {
        try {
          await participant.setMicrophoneEnabled(true);
          onError("El micrófono seleccionado ya no estaba disponible. Se activó el dispositivo predeterminado.");
        } catch (error) {
          onError(mediaErrorMessage(error));
        }
      }
    }

    async function enableCamera() {
      if (!choices.videoEnabled) return;

      try {
        await participant.setCameraEnabled(true, {
          ...(choices.videoDeviceId ? { deviceId: choices.videoDeviceId } : {}),
        });
      } catch {
        try {
          await participant.setCameraEnabled(true);
          onError("La cámara seleccionada ya no estaba disponible. Se activó el dispositivo predeterminado.");
        } catch (error) {
          onError(mediaErrorMessage(error));
        }
      }
    }

    void Promise.allSettled([enableMicrophone(), enableCamera()]);
  }, [choices, connectionState, onError, room]);

  return null;
}

function StudioWorkspace({ roomId }: { roomId: string }) {
  return (
    <div className={styles.studio}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <strong>image-brand</strong>
          <span>Creative Studio</span>
        </div>
        <nav aria-label="Secciones de Creative Room">
          <span aria-current="page">Pizarra</span>
          <span>Plantillas</span>
          <span>Propuesta</span>
        </nav>
        <div className={styles.roomStatus}>
          <i aria-hidden="true" />
          <span>Sala · {roomId}</span>
        </div>
      </header>

      <aside className={styles.library}>
        <div className={styles.panelTitle}>
          <h2>Biblioteca</h2>
          <p>Referencias de estructura</p>
        </div>
        <div className={styles.filters} aria-label="Filtros de demostración">
          <button type="button" aria-pressed="true">Todo</button>
          <button type="button">Portadas</button>
          <button type="button">Galerías</button>
        </div>
        <div className={styles.referenceList}>
          {references.map((reference) => (
            <article className={styles.reference} data-tone={reference.tone} key={reference.title}>
              <span>{reference.type}</span>
              <strong>{reference.title}</strong>
              {reference.tone === "gallery" ? <div className={styles.miniGallery}><i /><i /><i /></div> : null}
            </article>
          ))}
        </div>
      </aside>

      <main className={styles.canvas}>
        <div className={styles.canvasHeading}>
          <div>
            <h1>Perfil del Chef</h1>
            <p>Definición visual y estructura del sitio</p>
          </div>
          <span>Mesa de trabajo · demostración</span>
        </div>

        <div className={styles.board}>
          <article className={styles.coverConcept}>
            <span>Chef</span>
            <h2>Cocina de<br />origen</h2>
            <p>Técnica, territorio y producto de temporada</p>
            <div className={styles.plate} aria-hidden="true"><i /><b /></div>
          </article>
          <article className={styles.bioConcept}>
            <div>
              <h2>Sobre mí</h2>
              <p>Cocina contemporánea orientada al producto, la precisión y una identidad propia.</p>
            </div>
            <div className={styles.chefSilhouette} aria-hidden="true" />
          </article>
          <article className={styles.galleryConcept} aria-label="Galería de demostración">
            <div><i /></div><div><i /></div><div><i /></div>
          </article>
          <div className={styles.annotation}>
            <strong>Dirección visual</strong>
            <label><input type="checkbox" defaultChecked /> Estilo editorial</label>
            <label><input type="checkbox" defaultChecked /> Producto protagonista</label>
            <label><input type="checkbox" /> Retrato del chef</label>
          </div>
        </div>
      </main>

      <aside className={styles.rightRail}>
        <VideoPanel />
        <section className={styles.projectPanel}>
          <div className={styles.panelTitle}>
            <h2>Proyecto</h2>
            <p>Chef ejecutivo · Perfil profesional</p>
          </div>
          <dl>
            <div><dt>Dirección</dt><dd>Editorial</dd></div>
            <div><dt>Estructura</dt><dd>3 de 5 secciones</dd></div>
            <div><dt>Estado</dt><dd>Sesión creativa</dd></div>
          </dl>
          <div className={styles.sectionList}>
            <label><input type="checkbox" defaultChecked /> Portada</label>
            <label><input type="checkbox" defaultChecked /> Presentación</label>
            <label><input type="checkbox" defaultChecked /> Galería</label>
            <label><input type="checkbox" /> Experiencia</label>
            <label><input type="checkbox" /> Contacto y CV</label>
          </div>
        </section>
      </aside>
      <RoomAudioRenderer />
    </div>
  );
}

export function CreativeRoom({ roomId, invitation }: CreativeRoomProps) {
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [choices, setChoices] = useState<LocalUserChoices | null>(null);
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [hasConnected, setHasConnected] = useState(false);

  async function joinRoom(userChoices: LocalUserChoices) {
    setError("");
    setIsJoining(true);

    try {
      const response = await fetch("/api/studio/livekit-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room: roomId,
          invitation,
          name: userChoices.username,
        }),
      });
      const result = (await response.json()) as Credentials & { error?: string };

      if (!response.ok) throw new Error(result.error ?? "No se pudo entrar en la sala.");

      setChoices(userChoices);
      setCredentials(result);
    } catch (joinError) {
      setError(joinError instanceof Error ? joinError.message : "No se pudo entrar en la sala.");
    } finally {
      setIsJoining(false);
    }
  }

  if (!credentials || !choices) {
    return (
      <main className={styles.prejoinShell}>
        <div className={styles.prejoinBrand}>
          <strong>image-brand</strong>
          <span>Creative Studio</span>
        </div>
        <section className={styles.prejoinPanel}>
          <div className={styles.prejoinCopy}>
            <h1>Entrar en Creative Room</h1>
            <p>Comprueba tu cámara y micrófono antes de entrar. La sesión admite dos participantes.</p>
          </div>
          <DeviceAwarePreJoin
            onSubmit={joinRoom}
            isJoining={isJoining}
            externalError={error}
          />
        </section>
      </main>
    );
  }

  return (
    <LiveKitRoom
      token={credentials.token}
      serverUrl={credentials.serverUrl}
      connect
      audio={false}
      video={false}
      onConnected={() => setHasConnected(true)}
      onError={(roomError) => {
        setError(roomError.message || "No se pudo conectar con la sala.");
      }}
      onMediaDeviceFailure={(failure, kind) => {
        setError(`No se pudo acceder a ${kind === "videoinput" ? "la cámara" : "el micrófono"}. Puedes continuar sin ese dispositivo.`);
      }}
      onDisconnected={() => {
        setError(hasConnected ? "Has salido de la reunión. Puedes volver a entrar." : "No se pudo completar la conexión. Revisa la red e inténtalo de nuevo.");
        setCredentials(null);
        setChoices(null);
        setHasConnected(false);
      }}
    >
      {error ? <div className={styles.roomError} role="alert">{error}</div> : null}
      <InitialMediaPublisher choices={choices} onError={setError} />
      <StudioWorkspace roomId={roomId} />
    </LiveKitRoom>
  );
}
