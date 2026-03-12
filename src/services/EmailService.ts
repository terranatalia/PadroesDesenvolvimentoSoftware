import { NotificacaoEmail } from '../interface/NotificacaoEmail';

export class EmailService implements NotificacaoEmail {
    enviar(mensagem: string, destinatario: string): void {
    console.log(`Email para ${destinatario}: ${mensagem}`);
}
}