import random
from datetime import date, timedelta
from django.core.management.base import BaseCommand
from core.models import Department, Employee, Attendance, Leave
from faker import Faker

class Command(BaseCommand):
    help = 'Populate the database with dummy data'

    def handle(self, *args, **kwargs):
        fake = Faker()
        
        # Create Departments
        dept_names = ['Human Resources', 'IT', 'Finance', 'Marketing', 'Sales']
        departments = []
        for name in dept_names:
            dept, created = Department.objects.get_or_create(name=name, defaults={'description': f'{name} Department'})
            departments.append(dept)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(departments)} departments'))

        # Create Employees
        employees = []
        for _ in range(20):
            emp = Employee.objects.create(
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                email=fake.unique.email(),
                phone=fake.phone_number()[:15],
                department=random.choice(departments),
                designation=fake.job(),
                salary=random.randint(30000, 120000),
                date_joined=fake.date_between(start_date='-2y', end_date='today'),
                is_active=True
            )
            employees.append(emp)
        
        self.stdout.write(self.style.SUCCESS(f'Created {len(employees)} employees'))

        # Create Attendance (last 7 days)
        statuses = ['Present', 'Absent', 'Leave']
        for i in range(7):
            day = date.today() - timedelta(days=i)
            for emp in employees:
                status = random.choices(statuses, weights=[0.8, 0.1, 0.1])[0]
                check_in = None
                check_out = None
                if status == 'Present':
                    check_in = '09:00:00'
                    check_out = '17:00:00'
                
                Attendance.objects.create(
                    employee=emp,
                    date=day,
                    status=status,
                    check_in=check_in,
                    check_out=check_out
                )
        
        self.stdout.write(self.style.SUCCESS('Created attendance records'))

        # Create Leaves
        for _ in range(10):
            start = fake.date_between(start_date='today', end_date='+2m')
            Employee
            Leave.objects.create(
                employee=random.choice(employees),
                start_date=start,
                end_date=start + timedelta(days=random.randint(1, 5)),
                reason=fake.sentence(),
                status=random.choice(['Pending', 'Approved', 'Rejected'])
            )

        self.stdout.write(self.style.SUCCESS('Created leave records'))
