import Image from 'next/image'
import ClearIcon from '@/assets/images/clear.svg'
import RefreshIcon from '@/assets/images/refresh.svg'
import { FileItem } from '@/lib/bots/bing/types'
import { cn } from '@/lib/utils'
import { useBing } from '@/lib/hooks/use-bing'

type ChatAttachmentsProps = Pick<ReturnType<typeof useBing>, 'attachmentList' | 'setAttachmentList' | 'uploadImage'>

export function ChatAttachments({ attachmentList = [], setAttachmentList, uploadImage }: ChatAttachmentsProps) {
  return attachmentList.length ? (
    <div className="attachment-list">
      {attachmentList.map(file => (
        <div className="file-item" key={file.url}>
          {file.status === 'loading' && (
            <div className="loading">
              <div className="bar" />
            </div>)
          }
          {file.status !== 'error' && (
            <div className="thumbnail">
              <img draggable="false" src={file.url} />
            </div>)
          }
          {file.status === 'error' && (
            <div className="error">
              <Image alt="refresh" src={RefreshIcon} width={18} onClick={() => uploadImage(file.url)} />
            </div>
          )}
          <button className={cn('dismiss', { 'no-file': file.status === 'error' })} type="button">
            <Image alt="clear" src={ClearIcon} width={16} onClick={() => setAttachmentList([])} />
          </button>
        </div>
      ))}
    </div>
  ) : null
}
