import { IsNotEmpty } from 'class-validator';

export class Message {
  @IsNotEmpty()
  taskID: string;
  @IsNotEmpty()
  qrStr: string;

  constructor(taskId, qrStr) {
    this.taskID = taskId;
    this.qrStr = qrStr;
  }
}
