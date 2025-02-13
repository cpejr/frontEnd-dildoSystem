import React from 'react';

import { RiWhatsappLine } from 'react-icons/ri';

import './styles.css'

export default function WhatsButton({ children }) {
    return (
        <div>
            {children}
            <a className="whatsapp-button" href="https://web.whatsapp.com/send?phone=5562992250633" target="_blank">
                {/* <WhatsAppIcon /> */}
                < RiWhatsappLine className="whats-icon"/>
            </a>
        </div>
    )
}