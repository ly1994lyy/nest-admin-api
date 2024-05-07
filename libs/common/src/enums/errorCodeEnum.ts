export class ErrorCodeEnum {
  private readonly code: string;
  private readonly message: string;

  constructor(code: string, message: string) {
    this.code = code;
    this.message = message;
  }

  public getCode(): string {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public static SUCCESS = new ErrorCodeEnum('0000', 'Success');
  public static USER_EXISTED = new ErrorCodeEnum('10000', '用户已存在');
}
