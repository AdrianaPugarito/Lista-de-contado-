import React from "react";
import './contato.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCheck, faPhoneVolume, faUserXmark} from '@fortawesome/free-solid-svg-icons'

export default function Contato(props) {
    return (
        <div className="mx-2">
            <div className="container ct-guardados my-4">
            <div className="row">
                <div className="col p-2">
                    <h5>
                        <FontAwesomeIcon icon={faUserCheck} className="me-3" />
                        {props.nome}
                    </h5>
                </div>
                <div className="col p-2">
                    <h5>
                        <FontAwesomeIcon icon={faPhoneVolume} className="me-3" />
                        {props.telefone}
                    </h5>
                </div>
                <div className="col p-2 text-end">
                    <FontAwesomeIcon icon={faUserXmark} className="me-3" onClick={() => { props.remover(props.id) }} />
                </div>
            </div>
        </div>
        </div>
    )
}