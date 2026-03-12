export interface NotificacaoEmail {
    enviar(mensagem: string, destinatario: string): void;
}