'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const buttons = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
];

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prev, setPrev] = useState<string | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [reset, setReset] = useState(false);

  const handleButton = (val: string) => {
    if (val === 'C') {
      setDisplay('0');
      setPrev(null);
      setOp(null);
      setReset(false);
      return;
    }

    if (val === '±') {
      setDisplay((d) => String(parseFloat(d) * -1));
      return;
    }

    if (val === '%') {
      setDisplay((d) => String(parseFloat(d) / 100));
      return;
    }

    if (['÷', '×', '−', '+'].includes(val)) {
      setPrev(display);
      setOp(val);
      setReset(true);
      return;
    }

    if (val === '=') {
      if (!op || !prev) return;
      const a = parseFloat(prev);
      const b = parseFloat(display);
      let result = 0;
      if (op === '+') result = a + b;
      if (op === '−') result = a - b;
      if (op === '×') result = a * b;
      if (op === '÷') result = b !== 0 ? a / b : 0;
      setDisplay(String(parseFloat(result.toFixed(10))));
      setPrev(null);
      setOp(null);
      setReset(false);
      return;
    }

    if (val === '.') {
      if (reset) { setDisplay('0.'); setReset(false); return; }
      if (!display.includes('.')) setDisplay((d) => d + '.');
      return;
    }

    if (reset) {
      setDisplay(val);
      setReset(false);
    } else {
      setDisplay((d) => (d === '0' ? val : d + val));
    }
  };

  const isOperator = (v: string) => ['÷', '×', '−', '+'].includes(v);
  const isEquals = (v: string) => v === '=';

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 rounded-3xl p-4 shadow-2xl w-72">
        {/* Display */}
        <div className="bg-gray-900 rounded-2xl px-4 py-6 mb-4 text-right">
          <p className="text-gray-400 text-sm h-5">
            {prev && op ? `${prev} ${op}` : ''}
          </p>
          <p className="text-white text-4xl font-light truncate">{display}</p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {buttons.map((row, ri) =>
            row.map((val, ci) => (
              <Button
                key={`${ri}-${ci}`}
                onClick={() => handleButton(val)}
                className={[
                  'h-14 text-xl font-medium rounded-2xl transition-all cursor-pointer',
                  val === '0' && row.length === 3 ? 'col-span-2' : '',
                  val === 'C' || val === '±' || val === '%'
                    ? 'bg-gray-500 hover:bg-gray-400 text-black'
                    : isOperator(val)
                    ? 'bg-orange-500 hover:bg-orange-400 text-white'
                    : isEquals(val)
                    ? 'bg-orange-500 hover:bg-orange-400 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-white',
                ].join(' ')}
              >
                {val}
              </Button>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
