import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { SignUpDto } from 'src/auth/dto/signup-user.dto';

describe('UserService', () => {
  let service: UserService;
  let dto: SignUpDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    dto = module.get<SignUpDto>(SignUpDto);
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('createUser', () => {
    it('should return a saved user', async () => {
      dto.username = "Prueba12345";
      dto.email = "Prueba12345";
      dto.password = "Prueba12345"
      const users = await service.createUser(dto);
    })
  })
});
