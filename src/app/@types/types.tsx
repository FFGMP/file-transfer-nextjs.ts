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

export type fileUpload = { ficheiros: Array<string>; status: Boolean };
