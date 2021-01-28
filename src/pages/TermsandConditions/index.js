import React from 'react';
import "./styles.css";


import Footer from "../../components/Footer";
import Header from "../../components/Header";
import WhatsAppButton from '../../components/WhatsAppButton'

export default function TermsandConditions() {
    return (
        <div className="terms-all">
            <Header />
            <div className="terms-content">
                <h4 className="terms-titles">Termos de uso e política de privacidade</h4>
                <div className="condition-terms">
                    <p>
                        Nossa loja respeita o sigilo de suas informações e garante que seus dados não serão disponibilizados,
                        cedidos ou comercializados para terceiros. Todas as informações fornecidas em nosso site são de uso
                        exclusivo para o procedimento de compra, personalização, facilitação e não são disponibilizadas a
                        terceiros. Os dados fornecidos são registrados em nosso banco de dados de forma automatizada e
                        armazenados com total segurança sem a intervenção humana.<br></br><br></br>
                        Os e-mails e telefones disponibilizados são utilizados apenas para contatos referentes às compras
                        realizadas em nosso site. Com prévia autorização dos clientes, enviamos e-mails informando as
                        promoções vigentes em nossa loja, porém nossos clientes podem solicitar o não recebimento das
                        ofertas. Não há o armazenamento de informações que não sejam necessárias para a efetivação da
                        compra. O uso do CPF é exigido por lei para a emissão de notas fiscais e para o envio de mercadorias. <br></br><br></br>
                        As senhas fornecidas em nosso banco de dados são arquivadas de maneira criptografada, permitindo
                        que apenas o dono do cadastro tenha conhecimento. Os números de cartões de crédito fornecidos são
                        registrados diretamente no banco de dados das administradoras de cartão, não permitindo o acesso
                        a essas informações por parte do lojista. Ao informar os dados para a administradora, essa realiza
                        a verificação da transação on-line e retorna apenas se a compra está liberada ou não.
                    </p>
                </div>
            </div>
            <WhatsAppButton />
            <Footer />
        </div>
    )
}