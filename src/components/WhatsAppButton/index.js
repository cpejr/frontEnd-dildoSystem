import React from 'react';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

import './styles.css'

export default function WhatsButton() {
    return (
        <div>
            <a className="whatsapp-button" href="https://web.whatsapp.com/send?phone=553188532806" target="_blank">
                <WhatsAppIcon />
            </a>
        </div>
    )
}