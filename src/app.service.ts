import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly mailService: MailerService) {}

  async sendEmailNotification(data: any): Promise<void> {
    const { invoice, product, reason, quantity, observation, created_at } =
      JSON.parse(data);

    const template = 'devolution-solicitation';
    const subject = 'Solicitação de Devolução';

    try {
      this.mailService
        .sendMail({
          to: 'carloshenrique4m@gmail.com',
          from: `"PDI GAZIN" <ch.ferreir@hotmail.com>`,
          subject,
          template,
          context: {
            invoice: invoice.invoice_number,
            company_branch: invoice.company_branch.description,
            product: product.description,
            brand: product.brand,
            reason,
            quantity,
            observation,
            created_at: new Date(created_at).toLocaleDateString(),
          },
        })
        .then((success) => {
          this.logger.log(success);
        })
        .catch((err) => {
          this.logger.error(err);
        });
    } catch (error) {
      this.logger.error(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}
