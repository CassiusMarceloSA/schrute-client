
export const buildTelegramURL = (token: string) => {
  return `https://api.telegram.org/bot${token}/sendMessage`;
};

export const messageContent = (
  title: string,
  description: string,
  createdAt: string
) => {
  return `
        Nova tarefa criada:
        Criado em: ${createdAt}
        Titulo: ${title}
        Descrição: ${description}
    `.trim();
};