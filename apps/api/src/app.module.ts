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

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, TenantsModule, EmployeesModule, AttendancesModule, LeavesModule, DashboardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
