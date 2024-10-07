students=[]


file=open("data.txt")
lines=file.readlines()

for line in lines:
    data=line.rstrip().split(", ")
    student={
        'ID Number':data[0],'Name':data[1],'Course':data[2],
        'Major 1':data[3],'Major 2':data[4],
        'Minor 1':data[5],'Minor 2':data[6],'Minor 3':data[7],
        'Dropped':data[8]
    }
    students.append(student)
file.close()

def saveStudent():
    file=open('data.txt', 'w')
    for student in students:
        file.write(f"{student['ID Number']}, {student['Name']}, {student['Course']}, {student['Major 1']}, {student['Major 2']}, {student['Minor 1']}, {student['Minor 2']}, {student['Minor 3']}, {student['Dropped']}\n") 

def addStudents():
    id=24000
    print('____________________________')
    print('')
    name=input('Enter Name: ')
    course=input('Enter Course: ')
    print('Grades: ')
    major1=int(input('Enter Major 1: '))
    major2=int(input('Enter Major 2: '))
    minor1=int(input('Enter Minor 1: '))
    minor2=int(input('Enter Minor 2: '))
    minor3=int(input('Enter Minor 3: '))
    print('')
    print('____________________________')
    dropped='False'
    
    student={'ID Number':id+(len(students)+1), 'Name': name.title(),'Course':course.upper(), 
             'Major 1': major1,'Major 2':major2,
             'Minor 1':minor1,'Minor 2':minor2,'Minor 3':minor3,
             'Dropped':dropped
             }
    students.append(student)
    saveStudent()


def updateStudent():
    if students==[] :
        print('|=============================|')
        print('|   List is Currently Empty   |')
        print('|=============================|')
    else:
        print('|------------------------------------|')
        print('| ENTER ID NUMBER YOU WANT TO UPDATE |')
        print('|------------------------------------|')

        idNumber=int(input('Enter ID Number: '))

        for student in students:
            if idNumber==student['ID Number']:
                newName=input('Enter New Name: ')
                newCourse=input('Enter New Course: ')
                student['Name']=newName
                student['Course']=newCourse
                print('===========================================================================')
                print(f"    Name: updated to {student['Name']} And Course updated to {student['Course']}")
                print('===========================================================================')
                saveStudent()
                break
        if idNumber!=student['ID Number']:
            print('|--------------------------    |')
            print(f"|  {idNumber} is not in the list!       |")
            print('|--------------------------    |')


def updateGrades():
    if students==[] :
        print('|=============================|')
        print('|   List is Currently Empty   |')
        print('|=============================|')
    else:
        print('|------------------------------------|')
        print('| ENTER ID NUMBER YOU WANT TO UPDATE |')
        print('|------------------------------------|')

        idNumber=int(input('Enter ID Number: '))

        for student in students:
            if idNumber==student['ID Number']:
                major1=int(input('Enter New Grade for Major 1: '))
                major2=int(input('Enter New Grade for Major 2: '))
                minor1=int(input('Enter New Grade for Minor 1: '))
                minor2=int(input('Enter New Grade for Minor 2: '))
                minor3=int(input('Enter New Grade for Minor 3: '))
                student['Major 1']=major1
                student['Major 2']=major2
                student['Minor 1']=minor1
                student['Minor 2']=minor2
                student['Minor 3']=minor3
                print('|===============================|')
                print('|  GRADES UPDATED SUCCESSFULLY  |')
                print('|===============================|')

                saveStudent()
                break
        if idNumber!=student['ID Number']:
            print('|--------------------------    |')
            print(f"|  {idNumber} is not in the list!       |")
            print('|--------------------------    |')


def dropStudent():
    if students==[] :
        print('|=============================|')
        print('|   List is Currently Empty   |')
        print('|=============================|')
    else:
        print('|------------------------------------|')
        print('| ENTER ID NUMBER YOU WANT TO UPDATE |')
        print('|------------------------------------|')

        idNumber=int(input('Enter ID Number: '))

        for student in students:
            if idNumber==student['ID Number']:
                student['Dropped']='True'
                saveStudent()
                print('|================================|')
                print('|    STUDENT HAS BEEN DROPPED    |')
                print('|================================|')
                break
        if idNumber!=student['ID Number']:
            print('|--------------------------    |')
            print(f"|  {idNumber} is not in the list!       |")
            print('|--------------------------    |')

def viewAllStudents():
    if students==[]:
        print('|=============================|')
        print('|   List is Currently Empty   |')
        print('|=============================|')
    else:
        for student in students:
            major1=int(student['Major 1'])
            major2=int(student['Major 2'])
            minor1=int(student['Minor 1'])
            minor2=int(student['Minor 2'])
            minor3=int(student['Minor 3'])
            Grades=major1,major2,minor1,minor2,minor3
            average_Grade=sum(Grades)/len(Grades)
            student['Average Grade']=average_Grade

        for student in students:
            print('________________________')
            print('')
            print(f"    ID Number: {student['ID Number']}")
            print(f"    Name: {student['Name']}")
            print(f"    Course: {student['Course']}")
            print(f"    Minor 1: {student['Major 1']}")
            print(f"    Major 2: {student['Major 2']}")
            print(f"    Minor 1: {student['Minor 1']}")
            print(f"    Minor 2: {student['Minor 2']}")
            print(f"    Minor 3: {student['Minor 3']}")
            print(f"    Dropped: {student['Dropped']}")
            print(f"    Average Grade: {student['Average Grade']}")
            print('________________________')
            print('')

    
def viewTop3Students():
    if students==[]:
        print('|=============================|')
        print('|   List is Currently Empty   |')
        print('|=============================|')
    else:
        for student in students:
            major1=int(student['Major 1'])
            major2=int(student['Major 2'])
            minor1=int(student['Minor 1'])
            minor2=int(student['Minor 2'])
            minor3=int(student['Minor 3'])
            Grades=major1,major2,minor1,minor2,minor3
            average_Grade=sum(Grades)/len(Grades)
            student['Average Grade']=average_Grade

        for student in students:
            activeStudent=[student for student in students if student['Dropped']=='False']
            toBeSort=lambda student: student['Average Grade']
            sortedAvg=sorted(activeStudent,key=toBeSort,reverse=True)
            print('|==========================|')
            print('|           TOP 3          |')
            print('|==========================|')
            for student in sortedAvg[:3]:
                print(f"    ID Number: {student['ID Number']}")
                print(f"    Name: {student['Name']}")
                print(f"    Course: {student['Course']}")
                print(f"    Minor 1: {student['Major 1']}")
                print(f"    Major 2: {student['Major 2']}")
                print(f"    Minor 1: {student['Minor 1']}")
                print(f"    Minor 2: {student['Minor 2']}")
                print(f"    Minor 3: {student['Minor 3']}")
                print(f"    Dropped: {student['Dropped']}")
                print(f"    Average Grade: {student['Average Grade']}")
                print('|______________________|')

def main():
    while True:
        print('_____________________________')
        print('|                           |')
        print('|   STUDENT GRADE TRACKER   |')
        print('|___________________________|')
        print('|          CHOICES          |')
        print('|===========================|')
        print('|    1. Add Student         |')
        print('|    2. Update Student      |')
        print('|    3. Update grade        |')
        print('|    4. Drop Student        |')
        print('|    5. View All Students   |')
        print('|    6. Vie Top 3 Students  |')
        print('|    7. Exit                |')
        print('|___________________________|')
        choice=int(input('Enter Choice: '))
    
        if choice==1:
            addStudents()
        elif choice==2:
            updateStudent()
        elif choice==3:
            updateGrades()
        elif choice==4:
            dropStudent()
        elif choice==5:
            viewAllStudents()
        elif choice==6:
            viewTop3Students()
        elif choice==7:
            break
        else:
            ('Incorrect Choice! ')

if __name__=="__main__":
    main()
