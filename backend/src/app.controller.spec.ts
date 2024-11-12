import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mockData } from './utils';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return BalanceSheet', async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        }),
      ) as jest.Mock;

      const result = await appController.getBalanceSheet();
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith('http://localhost:3005/api.xro/2.0/Reports/BalanceSheet');
    });
  });
});
