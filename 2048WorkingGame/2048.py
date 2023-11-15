import random
import bruhHelper

if __name__ == '__main__':
    newMat = []
    for i in range(4):
        newMat.append([0] * 4)
    bruhHelper.addNew(newMat)
    for i in range(4):
        print(newMat[i][0], newMat[i][1], newMat[i][2], newMat[i][3])
    print("\nCommands are as Follows: \nW or w for up \nA or a for left \nD or d for right \nS or s for down \nQ to quit")
    val = input("Enter Move: \n")
    winCheck = 0
    while(val != "Q"):
        val, newMat, changed, intChecker = bruhHelper.checkValidChar(val, newMat, winCheck)
        if (val =="Q" or intChecker == -1):
            break
        elif (intChecker == 1):
            print("You Won!")
            checkVal = input("Continue? (answer y or n): \n")
            if (checkVal == "y"):
                winCheck = 1
                val = input("Enter Move: \n")
            else:
                break
        elif (changed == False):
            val = input("Try again: ")
        elif (val == "g"):
            print("Undefined Command, try again please")
            val = input("Enter Move: \n")
        else:
            print(val)
            bruhHelper.addNew(newMat)
            for i in range(4):
                print(newMat[i][0], newMat[i][1], newMat[i][2], newMat[i][3])
            val = input("Enter Move: \n")
    print("Game Over!")



