import React, { useEffect, useState } from 'react';

const LabelChecker: React.FC = () => {
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    function check() {
      const found: string[] = [];
      const labels = Array.from(document.querySelectorAll('label')) as HTMLLabelElement[];
      labels.forEach((label) => {
        const htmlFor = label.getAttribute('for') || label.htmlFor;
        if (htmlFor) {
          const target = document.getElementById(htmlFor);
          if (!target) {
            // build a readable path: text content + for value
            const text = (label.textContent || '').trim().slice(0, 40);
            found.push(`${text || '<no-text>'} -> for="${htmlFor}"`);
          }
        }
      });
      setIssues(found);
      if (found.length > 0) {
        console.warn('LabelChecker found labels with missing target elements:', found);
      } else {
        console.info('LabelChecker: all label htmlFor targets exist');
      }
    }

    // run shortly after mount to allow SSR hydration
    const id = setTimeout(check, 500);
    // also run on navigation and focus changes
    window.addEventListener('load', check);
    return () => {
      clearTimeout(id);
      window.removeEventListener('load', check);
    };
  }, []);

  if (issues.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-destructive text-white px-3 py-2 rounded shadow-lg">
      <div className="text-sm font-semibold">Label issues: {issues.length}</div>
      <ul className="text-xs mt-1 max-h-40 overflow-auto">
        {issues.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
    </div>
  );
};

export default LabelChecker;
