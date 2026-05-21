import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Breadcrumb({ steps = [] }) {
  const navigate = useNavigate();
  const allSteps = [{ label: 'Home', path: '/' }, ...steps];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '14px 24px', background: '#faf9f7', borderBottom: '1px solid #f0ede8', flexWrap: 'wrap' }}>
      {allSteps.map((step, index) => {
        const isLast = index === allSteps.length - 1;
        return (
          <React.Fragment key={index}>
            <button
              onClick={() => !isLast && step.path && navigate(step.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: isLast ? '#E1F5EE' : 'transparent',
                border: 'none', cursor: isLast ? 'default' : 'pointer',
                padding: '4px 10px', borderRadius: '20px',
                fontSize: '13px', fontWeight: isLast ? '600' : '400',
                color: isLast ? '#1D9E75' : '#666',
                transition: 'all 0.15s'
              }}
            >
              {index === 0 && <Home size={13} />}
              {step.label}
            </button>
            {!isLast && <ChevronRight size={14} color="#ccc" />}
          </React.Fragment>
        );
      })}
    </div>
  );
}