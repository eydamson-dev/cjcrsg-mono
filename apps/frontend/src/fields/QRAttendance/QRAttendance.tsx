"use client"

import { Share } from 'lucide-react'
import { toast } from '@payloadcms/ui'

import QRCodeStyling from 'qr-code-styling'
import { useEffect, useRef } from 'react'
import config from './qr-code-config';

import styles from './QRAttendance.module.scss'
import { useDocumentInfo } from '@payloadcms/ui';
import { Button } from '@/components/ui/button';
import { CopyButton } from '@/blocks/Code/CopyButton'


const ShareQRCodeButton = ({ qrCode, fileName }: { qrCode: QRCodeStyling, fileName: string }) => {
  const shareQrCode = async () => {
    try {
      const blob = await qrCode.getRawData('png')
      if (!blob) throw ('Error processing QR code to sharable file')

      const pngFile = new File([blob], fileName, { type: 'image/png' })
      if (!navigator.canShare({ files: [pngFile] })) throw ('Not enough permission')

      await navigator.share({ files: [pngFile], url: config.data, title: 'Shortcut to attendance' })
    } catch (e) {
      toast.error(e.message)
    }
  }

  return <>
    <Button type='button' className='flex gap-1' onClick={shareQrCode}>
      Share
      <Share strokeWidth={1.5} size={16} />
    </Button>
  </>
}

export const QRAttendance = () => {
  const ref = useRef(null)
  const { savedDocumentData } = useDocumentInfo()


  const date = new Date(savedDocumentData?.date)
  const fileName = `${date.toLocaleDateString('en-US', {
    dateStyle: 'medium'
  })} - ${savedDocumentData?.eventName}.png`
  const attendanceLink = `${process.env.SITE_URL}/attendance/${savedDocumentData?.id}`


  config.data = attendanceLink
  const qrCode = new QRCodeStyling(config)
  useEffect(() => {
    if (ref.current)
      qrCode.append(ref.current);
  }, [])



  return <>
    <div className={styles.container}>
      <p>Attendance link</p>
      <div ref={ref}></div>
      <div className={styles.actionButtons}>
        <CopyButton code={attendanceLink} />
        <ShareQRCodeButton qrCode={qrCode} fileName={fileName} />
      </div>
    </div>
  </>
}
