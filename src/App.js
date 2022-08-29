import React, { useState, useRef, useEffect } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faPersonCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import { v4 as chave } from "uuid";
import Contato from "./Componentes/contato"
//import ListaContatos from "./Componentes/listaContatos"
export default function App() {

    //states
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
    const [listaContato, setListaContato] = useState([])

    //useRef
    const inputNome = useRef()
    const inputTelefone = useRef()

    //metodos
    function definirNome(event) {
        setContato({ ...contato, nome: event.target.value })
    }

    function definirTelefone(event) {
        setContato({ ...contato, telefone: event.target.value })
    }

    function adicionarContato() {

        //validação dos campos
        if (contato.nome === "" || contato.telefone === "") return

        //verificar se o contato ja existe
        let verifCtDuplicado = listaContato.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
        //console.log(verifCtDuplicado)

        if (typeof verifCtDuplicado !== 'undefined') {
            inputTelefone.current.focus()
            return
        }

        //adicionar contato
        setListaContato([...listaContato, { ...contato, id: chave() }])
        //console.table(listaContato) so para saber q esta funcionando

        //limpar contato
        setContato({ nome: '', telefone: '' })

        //colocar focus no input nome
        inputNome.current.focus()
    }

    function enterContatoNovo(event) {
        if (event.code === 'Enter') {
            adicionarContato()
        }
    }

    //persistencia do state

    //carregar lista de contato
    useEffect(() => {
        if (localStorage.getItem('meus_contatos') !== null) {
            setListaContato(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, [])

    //atualizar a lista de contato no localStore
    useEffect(() => {
        localStorage.setItem('meus_contatos', JSON.stringify(listaContato))
    }, [listaContato])

    //limpar toda a lista
    function limparStorage() {
        setListaContato([])
    }

    //remover um contato da lista
    function removerContato(id) {
        let tmp = listaContato.filter(ct => ct.id !== id)
        setListaContato(tmp)
    }

    return (
        <>

            <div className="container-fluid titulo">
                <div className="row">
                    <div className="col text-center">
                        <h1 className="text-center"><FontAwesomeIcon icon={faAddressBook} className="me-3" />Meus Contatos</h1>
                    </div>
                </div>
            </div>

            <div className="container-fluid formulario">
                <div className="row">
                    <div className="col p-3">

                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label">Nome:</label><br />
                                    <input type="text" ref={inputNome} onChange={definirNome} value={contato.nome} className="form-control" />
                                </div>
                                <div>
                                    <label className="form-label">Telefone:</label><br />
                                    <input type="text" ref={inputTelefone} onChange={definirTelefone} onKeyUp={enterContatoNovo} value={contato.telefone} className="form-control" />
                                </div>

                                <div className="row mt-3">
                                    <div className="col text-start">
                                        <button onClick={limparStorage} className="btn btn-danger">
                                        <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                                            Limpar Lista
                                        </button>
                                    </div>
                                    <div className="col text-end">
                                        <button onClick={adicionarContato} className="btn btn-primary">
                                        <FontAwesomeIcon icon={faPersonCirclePlus} className="me-2" />
                                            Adicionar contato
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {listaContato.map(ct => {
                return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
            })}
        </>
    )
}