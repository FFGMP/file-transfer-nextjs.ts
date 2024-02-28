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

export type FileUpload = { ficheiros: Array<string>; status: string };

export type APISuccessType<T> = {
  status: "success";
  message: string;
  data: T;
};

export type APIErrorType = {
  status: "failed";
  error: {
    code: string;
    message: string;
    stack?: string;
  };
};

export type FileManager =
  | { filename: string; statusofFile: true }
  | { filename: string; statusofFile: false; error: string };
