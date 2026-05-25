import React, { useState } from 'react';
import { Avatar } from './UI';
import { LogOut } from 'lucide-react';

const LOGO_SRC = `${process.env.PUBLIC_URL}/utb-logotipo.png`;

export default function TopNav({ mode, onModeChange, user, onLogout }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const adminTabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'recursos', label: 'Recursos' },
    { id: 'reservas', label: 'Reservas' },
    { id: 'prestamos', label: 'Préstamos' },
    { id: 'usuarios', label: 'Usuarios' },
    { id: 'reportes', label: 'Reportes' },
  ];
  const userTabs = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'mis-reservas', label: 'Mis reservas' },
    { id: 'mis-prestamos', label: 'Mis préstamos' },
  ];
  const tabs = mode.role === 'admin' ? adminTabs : userTabs;

  const getUserInitials = () => {
    if (user && user.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getUserName = () => {
    if (user && user.name) {
      return user.name;
    }
    if (user && user.email) {
      return user.email.split('@')[0];
    }
    return 'Usuario';
  };

  const getRoleLabel = () => {
    if (user && user.role === 'admin') return 'Administrador';
    if (user && user.role === 'teacher') return 'Docente';
    return 'Estudiante';
  };

  const highlightLogoutButton = (e) => {
    e.currentTarget.style.background = 'var(--bg-secondary)';
    e.currentTarget.style.borderColor = 'var(--border-primary)';
  };

  const resetLogoutButton = (e) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.borderColor = 'var(--border-secondary)';
  };

  const highlightNeutralButton = (e) => {
    e.currentTarget.style.background = 'var(--bg-secondary)';
  };

  const resetNeutralButton = (e) => {
    e.currentTarget.style.background = 'transparent';
  };

  const highlightDangerButton = (e) => {
    e.currentTarget.style.background = '#DC2626';
  };

  const resetDangerButton = (e) => {
    e.currentTarget.style.background = '#EF4444';
  };

  return (
    <>
      <header className="top-nav" style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-secondary)',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        height: '52px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div className="top-nav__brand" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '24px', flexShrink: 0 }}>
          <img
            src={LOGO_SRC}
            alt="UTB"
            style={{
              width: '68px',
              height: '34px',
              objectFit: 'contain',
              display: 'block',
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>UniPréstamos</span>
        </div>

        {/* Tabs */}
        <nav className="top-nav__tabs" style={{ display: 'flex', gap: '2px', flex: 1 }}>
          {tabs.map(tab => (
            <button
              className="top-nav__tab"
              key={tab.id}
              onClick={() => onModeChange({ ...mode, page: tab.id })}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: mode.page === tab.id ? 500 : 400,
                color: mode.page === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                borderRadius: '6px',
                cursor: 'pointer',
                border: 'none',
                background: mode.page === tab.id ? 'var(--bg-secondary)' : 'transparent',
                fontFamily: 'var(--font)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >{tab.label}</button>
          ))}
        </nav>

        {/* Right side: user info + logout */}
        <div className="top-nav__actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* User info */}
          <div className="top-nav__user" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <Avatar initials={getUserInitials()} />
            <div className="top-nav__user-meta">
              <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{getUserName()}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                {getRoleLabel()}
              </div>
            </div>
          </div>

          {/* Logout button */}
          <button
            className="top-nav__logout"
            onClick={() => setShowLogoutConfirm(true)}
            style={{
              padding: '6px 12px',
              background: 'transparent',
              border: '1px solid var(--border-secondary)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s',
              fontFamily: 'inherit',
            }}
            onMouseOver={highlightLogoutButton}
            onFocus={highlightLogoutButton}
            onMouseOut={resetLogoutButton}
            onBlur={resetLogoutButton}
            title="Cerrar sesión"
          >
            <LogOut size={16} />
            <span className="top-nav__logout-label">Salir</span>
          </button>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="app-modal-backdrop" style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div className="app-modal-panel" style={{
            background: 'var(--bg-primary)',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)' }}>
              ¿Cerrar sesión?
            </h3>
            <p style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
              ¿Estás seguro de que deseas cerrar tu sesión?
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--border-secondary)',
                  background: 'transparent',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
                onMouseOver={highlightNeutralButton}
                onFocus={highlightNeutralButton}
                onMouseOut={resetNeutralButton}
                onBlur={resetNeutralButton}
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                style={{
                  padding: '8px 16px',
                  background: '#EF4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'all 0.15s',
                  fontFamily: 'inherit',
                }}
                onMouseOver={highlightDangerButton}
                onFocus={highlightDangerButton}
                onMouseOut={resetDangerButton}
                onBlur={resetDangerButton}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
