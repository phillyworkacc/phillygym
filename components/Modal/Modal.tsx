'use client'
import './Modal.css'
import { X } from 'lucide-react';
import { ReactNode } from 'react'

type ModalProps = {
   children: ReactNode;
   closeBtnAction: () => void;
   modalBoxStyles?: React.CSSProperties;
   noCloseBtn?: boolean;
}

export function Modal ({ children, closeBtnAction, modalBoxStyles, noCloseBtn }: ModalProps) {
   return (
      <div className="modal">
         <div className='modal-box' style={modalBoxStyles}>
            {(!noCloseBtn) && (<div className="modal-close" onClick={closeBtnAction}><X size={20} /></div>)}
            {children}
         </div>
      </div>
   )
}
