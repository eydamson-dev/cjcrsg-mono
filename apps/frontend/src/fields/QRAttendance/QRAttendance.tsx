'use client';

import { useEffect, useRef, useState } from 'react';

import { toast } from '@payloadcms/ui';
import { useDocumentInfo } from '@payloadcms/ui';

import { CopyButton } from '@/blocks/Code/CopyButton';
import { Share } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';

import { Button } from '@/components/ui/button';

import styles from './QRAttendance.module.scss';
import config from './qr-code-config';

const ShareQRCodeButton = ({ qrCode, fileName }: { qrCode: QRCodeStyling; fileName: string }) => {
  const shareQrCode = async () => {
    try {
      const blob = await qrCode.getRawData('png');
      if (!blob) throw 'Error processing QR code to sharable file';

      const pngFile = new File([blob], fileName, { type: 'image/png' });
      if (!navigator.canShare({ files: [pngFile] })) throw 'Not enough permission';

      await navigator.share({
        files: [pngFile],
        url: config.data,
        title: 'Shortcut to attendance',
      });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Button type="button" className="flex gap-1" onClick={shareQrCode}>
        Share
        <Share strokeWidth={1.5} size={16} />
      </Button>
    </>
  );
};

export const QRAttendance = () => {
  const ref = useRef(null);
  const { savedDocumentData } = useDocumentInfo();

  const date = new Date(savedDocumentData?.date);
  const fileName = `${date.toLocaleDateString('en-US', {
    dateStyle: 'medium',
  })} - ${savedDocumentData?.eventName}.png`;
  const attendanceLink = `${process.env.SITE_URL}/attendance/${savedDocumentData?.id}`;

  config.data = attendanceLink;

  const [qrCode, setQrCode] = useState<QRCodeStyling>();

  useEffect(() => {
    if (window && !qrCode) setQrCode(new QRCodeStyling(config));

    if (ref.current && qrCode) qrCode.append(ref.current);
  }, [ref, qrCode]);

  return (
    <>
      {qrCode && (
        <div className={styles.container}>
          <p>Attendance link</p>
          <div ref={ref}></div>
          <div className={styles.actionButtons}>
            <CopyButton code={attendanceLink} />
            <ShareQRCodeButton qrCode={qrCode} fileName={fileName} />
          </div>
        </div>
      )}
    </>
  );
};
