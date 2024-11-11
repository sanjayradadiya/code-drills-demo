import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getBalanceSheet() {
    try {
      const bal = await fetch(
        'http://localhost:3006/api.xro/2.0/Reports/BalanceSheet',
      );
      const res = await bal.json();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
}
