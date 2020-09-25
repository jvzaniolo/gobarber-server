import IParseMailTemplateDTO from '../../MailTemplateProvider/dtos/IParseMailTemplateDTO';

interface IContactProps {
  name: string;
  email: string;
}

interface ISendMailDTO {
  to: IContactProps;
  from?: IContactProps;
  subject: string;
  templateData: IParseMailTemplateDTO;
}

export default ISendMailDTO;
