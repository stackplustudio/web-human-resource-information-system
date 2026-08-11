import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module'; // TAMBAHKAN INI
import { TenantsModule } from './tenants/tenants.module';
import { EmployeesModule } from './employees/employees.module';
import { AttendancesModule } from './attendances/attendances.module';
import { LeavesModule } from './leaves/leaves.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PayrollModule } from './payroll/payroll.module';
import { PerformanceModule } from './performance/performance.module';
import { TaxesModule } from './taxes/taxes.module';
import { RecruitmentModule } from './recruitment/recruitment.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, TenantsModule, EmployeesModule, AttendancesModule, LeavesModule, DashboardModule, PayrollModule, PerformanceModule, TaxesModule, RecruitmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
