import React, { useState, useRef } from 'react';
import QRCode from 'react-qr-code';

export default function App() {
  const [option, setOption] = useState('url');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const qrRef = useRef(null);

  const generateContactInfo = () => {
    return "MECARD:N:" + name + ";TEL:" + phone + ";EMAIL:" + email + ";;";
  };

  const getQRCodeValue = () => {
    if (option === 'url') {
      return url;
    } else {
      return generateContactInfo();
    }
  };

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'qr-code.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);
  };

  const handleGenerateClick = () => {
    if (getQRCodeValue()) {
      setShowQRCode(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black flex flex-col items-center justify-center py-20 px-6">
      <h1 className="text-cyan-400 text-6xl font-extrabold mb-16 tracking-widest drop-shadow-[0_0_10px_cyan]">QR CODE GENERATOR</h1>
      <div className="bg-gray-900 bg-opacity-90 rounded-3xl shadow-2xl p-12 w-full max-w-xl">
        <div className="mb-10 flex space-x-12">
          <label className="inline-flex items-center space-x-4 text-xl font-semibold text-cyan-400">
            <input
              type="radio"
              className="form-radio h-7 w-7 text-cyan-400 accent-cyan-400"
              name="option"
              value="url"
              checked={option === 'url'}
              onChange={() => setOption('url')}
            />
            <span>URL</span>
          </label>
          <label className="inline-flex items-center space-x-4 text-xl font-semibold text-cyan-400">
            <input
              type="radio"
              className="form-radio h-7 w-7 text-cyan-400 accent-cyan-400"
              name="option"
              value="contact"
              checked={option === 'contact'}
              onChange={() => setOption('contact')}
            />
            <span>Contact Info</span>
          </label>
        </div>

        {option === 'url' ? (
          <input
            type="text"
            placeholder="Enter URL"
            className="w-full rounded-2xl"
            style={{ marginBottom: '0.1in' }}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        ) : (
          <div className="space-y-8 mb-10">
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded-2xl"
              style={{ marginBottom: '0.1in' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-2xl"
              style={{ marginBottom: '0.1in' }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-2xl"
              style={{ marginBottom: '0.1in' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <div style={{ marginTop: '0.2in', marginBottom: '0.2in' }}>
          <button
            onClick={handleGenerateClick}
            className="w-full rounded-2xl  mb-20 shadow-[0_0_10px_cyan]"
            disabled={!getQRCodeValue()}
          >
            Generate QR
          </button>
        </div>

        {showQRCode && (
          <>
          <div ref={qrRef} className="flex justify-center py-10" style={{ marginTop: '0.2in', marginBottom: '0.2in' }}>
            <QRCode value={getQRCodeValue() || ' '} size={220} bgColor="#0f0f0f" fgColor="#00ffff" />
          </div>

      <div style={{ marginTop: '0.2in', marginBottom: '0.2in' }}>
          <button
            onClick={downloadQRCode}
            className="w-full rounded-2xl mb-10 shadow-[0_0_15px_cyan]"
            disabled={!getQRCodeValue()}
          >
            Download QR Code
          </button>
        </div>
          </>
        )}
      </div>
    </div>
  );
}
