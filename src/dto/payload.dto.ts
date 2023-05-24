export class PayloadDto {
  data: {
    _id: string;
    readonly username: string;
    readonly role: string;
    readonly prefix: string;
    readonly agentId: string;
  };
}
