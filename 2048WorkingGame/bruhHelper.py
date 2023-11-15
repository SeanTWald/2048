import random

def addNew(array):
    r = random.randint(0,3)
    c = random.randint(0,3)
    t = 0
    while(array[r][c] != 0):
        r = random.randint(0,3)
        c = random.randint(0,3)
        print(r, c)
    n = random.randint(1,100)
    if (n <= 80):
        t = 2
    elif (n <= 95):
        t = 4
    else:
        t = 8
    array[r][c] = t

def checkValidChar(val, grid, winCheck):
    changed = True
    if (val == "A" or val == "a"):
        val = "a"
        grid, changed = move_left(grid)
    elif (val == "S" or val == "s"):
        val = "s"
        grid, changed = move_down(grid)
    elif (val == "D" or val == "d"):
        val = "d"
        grid, changed = move_right(grid)
    elif (val == "W" or val == "w"):
        val = "w"
        grid, changed = move_up(grid)
    elif (val =="Q" or val =="q" or val == "quit" or val == "Quit"):
        val = "Q"
    else:
        val = "g"
    intChecker = get_current_state(grid)
    if (intChecker == -1):
        return "Q", grid, changed, intChecker
    if (intChecker == 0):
        return val, grid, changed, intChecker
    if (intChecker == 1):
        if (winCheck != 1):
            return val, grid, changed, intChecker
        else:
            return val, grid, changed, 0

def move_left(grid):
    #most simple implememntation 
    # every function built for left
    grid, changed1 = compress(grid)
    grid, changed2 = merge(grid)
    changed = changed1 or changed2
    #new_grid, changed = compress(new_grid)
    return grid, changed

def compress(mat):
    changed = False
    new_mat = []
    for i in range(4):
        new_mat.append([0] * 4)

    #shift entries to extreme left
    #because left is 0, easy to work with
    for i in range(4):
        pos = 0
        for j in range(4):
            if(mat[i][j] != 0):
                new_mat[i][pos] = mat[i][j]
                if(j != pos):
                    changed = True
                pos += 1
    return new_mat, changed

def merge(mat):
    changed = False
    for i in range(4):
        for j in range(3):
            if (mat[i][j] == mat[i][j+1] and mat[i][j] != 0):
                mat[i][j] = mat[i][j] *2
                mat[i][j+1] = 0
                changed = True
    return mat, changed
    
def move_right(grid):
    #reverse of left, so reverse grid
    new_grid = reverse(grid)
    new_grid, changed = move_left(new_grid)
    new_grid = reverse(new_grid)
    return new_grid, changed

def reverse(mat):
    new_mat = []
    for i in range(4):
        new_mat.append([])
        for j in range(4):
            new_mat[i].append(mat[i][3-j])
    return new_mat

def move_up(grid):
    new_grid = transpose(grid)
    new_grid, changed = move_left(new_grid)
    new_grid = transpose(new_grid)
    return new_grid, changed

def transpose (mat):
    new_mat = []
    for i in range(4):
        new_mat.append([])
        for j in range(4):
            new_mat[i].append(mat[j][i])
    return new_mat

def move_down(grid):
    new_grid = transpose(grid)
    new_grid, changed = move_right(new_grid)
    new_grid = transpose(new_grid)
    return new_grid, changed

def get_current_state(mat):
    for i in range(4):
        for j in range (4):
            if(mat[i][j] == 2048):
                return 1
    for i in range(4):
        for j in range (4):
            if(mat[i][j] == 0):
                return 0

    for j in range(3):
        for i in range(4):
            if (mat[i][j] == mat[i][j+1]):
                return 0

    for i in range(3):
        for j in range(4):
            if (mat[i][j] == mat[i+1][j]):
                return 0
    return -1