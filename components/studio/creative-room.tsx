"use client";

import { useState } from "react";
import {
  ConnectionState,
  LiveKitRoom,
  ParticipantTile,
  PreJoin,
  RoomAudioRenderer,
  TrackLoop,
  TrackToggle,
  useConnectionState,
  useParticipants,
  useTracks,
  DisconnectButton,
} from "@livekit/components-react";
import type { LocalUserChoices } from "@livekit/components-core";
import { Track } from "livekit-client";
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
          <PreJoin
            onSubmit={joinRoom}
            onError={(deviceError) => setError(deviceError.message)}
            joinLabel={isJoining ? "Conectando…" : "Entrar en la reunión"}
            userLabel="Tu nombre"
            micLabel="Micrófono"
            camLabel="Cámara"
            persistUserChoices={false}
          />
          {error ? <p className={styles.error} role="alert">{error}</p> : null}
        </section>
      </main>
    );
  }

  return (
    <LiveKitRoom
      token={credentials.token}
      serverUrl={credentials.serverUrl}
      connect
      audio={choices.audioEnabled ? { deviceId: choices.audioDeviceId } : false}
      video={choices.videoEnabled ? { deviceId: choices.videoDeviceId } : false}
      onError={(roomError) => setError(roomError.message)}
      onMediaDeviceFailure={() => setError("No se pudo acceder a la cámara o al micrófono.")}
      onDisconnected={() => {
        setCredentials(null);
        setChoices(null);
      }}
    >
      {error ? <div className={styles.roomError} role="alert">{error}</div> : null}
      <StudioWorkspace roomId={roomId} />
    </LiveKitRoom>
  );
}
