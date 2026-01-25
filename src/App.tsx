import { useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { PhaserGame, PhaserGameRef } from './ui/PhaserGame';
import { useGameStore } from './ui/store/gameStore';
import './index.css';

export function App() {
  const phaserRef = useRef<PhaserGameRef>(null);
  const activeMenu = useGameStore((s) => s.activeMenu);

  return (
    <div className="game-container">
      {/* Phaser canvas */}
      <PhaserGame ref={phaserRef} />

      {/* React UI overlay - positioned over the canvas via CSS */}
      <div className="ui-overlay">
        {/* HUD elements - always visible */}
        <div className="hud-top-right">
          {/* Add your HUD components here */}
        </div>

        {/* Menus render centered */}
        <AnimatePresence>
          {activeMenu === 'pause' && (
            <div className="panel" style={{ padding: 24 }}>
              <p style={{ marginBottom: 16 }}>Game Paused</p>
              <button
                className="btn btn-primary"
                onClick={() => useGameStore.getState().closeMenu()}
              >
                Resume
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
