import { Body, Controller, Post, Req } from '@nestjs/common';
import { GenerateOtpDto } from './dto/generate-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OtpService } from './otp.service';
import { EmailService } from './email.service';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly emailService: EmailService,
  ) {}

  @Post('generate')
  generateOtp(@Body() generateOtpDto: GenerateOtpDto, @Req() request: any) {
    const currentUrl = request.headers.referer || ''; // Extract current URL from headers
    return this.otpService.generateOtp(
      generateOtpDto,
      generateOtpDto.email,
      currentUrl,
    );
  }

  @Post('verify')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.otpService.verifyOtp(verifyOtpDto, verifyOtpDto.email);
  }
}
