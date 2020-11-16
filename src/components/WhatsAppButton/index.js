import React from 'react';

import { RiWhatsappLine } from 'react-icons/ri';

import './styles.css'

export default function WhatsButton() {
    return (
        <div>
            <a className="whatsapp-button" href="https://web.whatsapp.com/send?phone=553188532806" >
                {/* <WhatsAppIcon /> */}
                < RiWhatsappLine className="MuiSvgIcon-root"/>
            </a>
        </div>
    )
}