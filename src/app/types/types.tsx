export type AsyncResponse<T> = Promise<
  | {
      status: "success";
      data: T;
    }
  | {
      status: "failed";
      error: {
        code: string;
        message: string;
        details?: {
          message: string;
          stack?: any;
        };
        stack?: string;
      };
    }
>;

//Isto é a devolução do pedido caso este seja de sucesso por parte da API
export type APISuccessType<T> = {
  status: "success";
  message: string;
  data: T;
  path: string;
};

//Isto é o conteudo do que vai em "data" para a resposta da API
export type FileManager =
  | { filename: string; statusofFile: true }
  | { filename: string; statusofFile: false; error: string };

//Isto é a devolução do pedido caso este seja de erro por parte da API
export type APIErrorType = {
  status: "failed";
  error: {
    code: string;
    message: string;
    stack?: string;
  };
};

export type FileStatsType = {
  fileName: string;
  size: string;
  type: string | undefined;
};
