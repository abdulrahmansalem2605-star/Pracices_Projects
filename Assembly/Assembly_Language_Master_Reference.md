# x86 Assembly Language — Master Reference Manual

> A consolidated reference of theoretical knowledge, practical implementations, and project exercises covering the 8086/8088 architecture as studied through the emu8086 environment.

**Author:** Abdulrahman Arfan Salem  
**Institution:** Al-Sham Private University — Faculty of Engineering  
**Environment:** emu8086 | **Architecture:** 8086/8088 (16-bit real mode)  
**Scope:** Memory access, arithmetic, control flow, I/O, procedures, macros, and applied projects

---

## Table of Contents

1. [Memory Access & Data Movement](#1-memory-access--data-movement)
2. [Variables, Arrays & Constants](#2-variables-arrays--constants)
3. [Arithmetic Operations](#3-arithmetic-operations)
4. [Flags & Status Register](#4-flags--status-register)
5. [Conditional & Unconditional Jumps](#5-conditional--unconditional-jumps)
6. [Loops](#6-loops)
7. [Input/Output, Procedures & Macros](#7-inputoutput-procedures--macros)
8. [Homework & Applied Projects](#8-homework--applied-projects)

---

## 1. Memory Access & Data Movement

### 1.1 Program Origin & Structure

All programs begin with `org 100h` — the standard offset for COM files in the emu8086 environment. This places the program at offset `0100h` within the code segment, reserving the first 256 bytes for the PSP (Program Segment Prefix).

```asm
org 100h
; program code here
ret
```

### 1.2 The MOV Instruction

The `MOV` instruction is the fundamental data transfer mechanism. It copies data from a source operand to a destination operand without altering the source.

**Syntax:** `MOV destination, source`

**Constraints:**
- Both operands must be the same size (byte-to-byte, word-to-word)
- Cannot move directly from memory to memory
- Cannot move a value into the segment registers directly without first loading into a general-purpose register

### 1.3 Direct Addressing

Direct addressing specifies an absolute memory address as the destination or source.

```asm
mov [12ABH], al          ; store AL at offset 12ABh
mov [12ABH], cx          ; store CX at offset 12ABh (word)
mov cx, 4231H            ; load immediate value into CX
```

### 1.4 Register Indirect Addressing

Using a register (typically `SI`, `DI`, `BX`, or `BP`) as a pointer to memory. The register holds the offset address.

```asm
mov si, 1234H            ; SI = pointer to offset 1234h
mov [si], al             ; store AL at address in SI
mov [si], ah             ; overwrite with AH
mov si, 2345H            ; reassign SI to new address
mov [si], bl             ; store BL at new address
```

**Key advantage:** The address is stored once in a register and reused, avoiding repetition of the literal address.

### 1.5 Segment Override & Segment Registers

The 8086 uses segment registers (`DS`, `ES`, `SS`, `CS`) to form physical addresses. To access memory outside the default `DS` segment, the segment register must be loaded first:

```asm
mov ax, 0800H
mov ds, ax               ; DS = 0800h, forming physical address 0800:xxxx
mov [5678H], 1234H       ; store 1234h at DS:5678h
```

The physical address is computed as: `Segment × 16 + Offset` → `0800h × 16 + 5678h = 0D678h`.

### 1.6 Register-to-Memory and Memory-to-Register Transfers

```asm
mov ax, 0A0FH            ; AX = 0A0Fh
mov cl, al               ; CL = 0Fh (low byte of AX)
mov dx, 0800H
mov ds, dx               ; set data segment
mov [5678H], 1234H       ; store word at segment:offset
```

### 1.7 Byte-Level Operations

Individual bytes within a register can be accessed and stored independently:

```asm
mov si, 1234H
mov [si], al             ; store low byte
mov [si], ah             ; store high byte (overwrites)
mov [si], bl             ; store BL (overwrites)
```

---

## 2. Variables, Arrays & Constants

### 2.1 Data Definition Directives

| Directive | Size | Description |
|-----------|------|-------------|
| `DB` | 1 byte | Define Byte — stores 8-bit values |
| `DW` | 2 bytes | Define Word — stores 16-bit values |
| `DUP(n)` | n × size | Duplicates a value n times |
| `EQU` | — | Equate — defines a symbolic constant (no storage) |
| `?` | — | Uninitialized — reserves space without assigning a value |

### 2.2 Variable Declaration

```asm
val1 dw 1234H            ; word variable, initialized to 1234h
val2 dw 4567H            ; word variable, initialized to 4567h
val3 db ?                ; byte variable, uninitialized
data1 DW 5A3Ch           ; word variable
```

### 2.3 Constant Definition with EQU

Constants defined with `EQU` are substituted at assembly time — they occupy no memory:

```asm
K1 EQU 45H              ; 8-bit constant
K2 EQU 7B9EH            ; 16-bit constant
address equ 2249H       ; symbolic address
```

### 2.4 Loading Variables into Registers

```asm
mov ax, val1             ; AX = value stored at val1
mov bx, [123H]           ; BX = word at offset 123h
mov bx, val2             ; BX = value stored at val2
mov cl, val3             ; CL = byte at val3
```

### 2.5 Loading Effective Address (LEA)

`LEA` loads the offset address of a variable into a register, not the value itself:

```asm
lea bx, var1             ; BX = offset of var1
mov [bx], 44H            ; store 44h at address pointed by BX
mov al, var1             ; AL = value at var1 (not the address)
```

**Distinction:** `MOV SI, [DATA]` loads the first value in DATA, while `LEA SI, DATA` loads the address of DATA. Always use `LEA` or `OFFSET` when the address is needed.

### 2.6 Array Declaration

```asm
arr db 10 dup(0)         ; array of 10 bytes, all initialized to 0
arr1 dw 12H, ?, 64H      ; word array: 12h, uninitialized, 64h
```

### 2.7 Array Element Access

Elements can be accessed by offset arithmetic or indexed notation:

```asm
; Offset arithmetic
mov al, arr1             ; first element (byte 0)
mov bl, arr+1            ; second element (byte 1)
mov cl, arr+2            ; third element (byte 2)
mov arr1+1, 55H          ; overwrite second element

; Indexed notation
mov arr[0], 1H           ; first element
mov arr[1], 2H           ; second element
mov arr[2], 3H           ; third element
```

### 2.8 Storing Values in Arrays

```asm
; Store constants and variables into arrays
MOV [vals], K1           ; K1 at vals[0]
MOV [vals+1], K2         ; K2 at vals[1]
MOV [vals+3], AX         ; AX (data1 offset) at vals[3]

; Store register values
MOV [regs], AX           ; AX at regs[0]
MOV [regs+2], BX         ; BX at regs[1]
MOV [regs+4], CX         ; CX at regs[2]
MOV [regs+6], DX         ; DX at regs[3]
```

### 2.9 Binary and Character Literals

```asm
mov al, 0fH              ; hex literal
mov [si], 010101B        ; binary literal (05h)
mov al, 'A'              ; character literal (41h)
```

---

## 3. Arithmetic Operations

### 3.1 Addition (ADD)

Performs `destination = destination + source`. Affects flags: CF, OF, ZF, SF, PF, AF.

```asm
mov al, 22H
mov bl, 08H
add al, BL               ; AL = 2Ah
```

**Accumulating array elements:**

```asm
add al, arr              ; AL += arr[0]
add al, arr+1            ; AL += arr[1]
add al, arr+2            ; AL += arr[2]
add al, arr+3            ; AL += arr[3]
add al, arr+4            ; AL += arr[4]
```

### 3.2 Add with Carry (ADC)

Performs `destination = destination + source + CF`. Used for multi-byte addition.

```asm
stc                      ; CF = 1
adc al, 2                ; AL = AL + 2 + 1 (carry included)
```

**Behavior note:** `STC` sets the carry flag. If a prior `ADD` operation already set CF, `ADC` incorporates it. An explicit `STC` before `ADC` has no effect on the result if CF was already set by the preceding operation.

### 3.3 Subtraction (SUB)

Performs `destination = destination - source`. Sets CF when the result underflows (unsigned).

```asm
mov al, 20
mov bl, 21
sub al, BL               ; AL = FFh (20 - 21 = -1, wraps unsigned)
```

### 3.4 Carry Flag Manipulation

```asm
stc                      ; set carry flag (CF = 1)
clc                      ; clear carry flag (CF = 0)
```

### 3.5 Multiplication (MUL)

**Unsigned multiplication:**

| Operand Size | Multiplier | Result Location |
|-------------|------------|-----------------|
| 8-bit (`MUL r/m8`) | AL | AX |
| 16-bit (`MUL r/m16`) | AX | DX:AX |

```asm
mov al, 2
mov bl, 2
mul bl                   ; AX = AL × BL = 4

mov ax, 2
mov bx, 4
mul ax                   ; DX:AX = AX × BX = 8 (DX=0)
```

### 3.6 Signed Multiplication (IMUL)

Same syntax as `MUL` but treats operands as signed (two's complement):

```asm
mov al, -2               ; AL = FEh
mov bl, 5
mul bl                   ; unsigned: FEh × 5 = 4F6h (AX = 04F6h)

mov al, -2
mov bl, 5
imul bl                  ; signed: (-2) × 5 = -10 (AX = FFF6h)
```

### 3.7 Division (DIV)

**Unsigned division:**

| Dividend | Divisor | Quotient | Remainder |
|----------|---------|----------|-----------|
| AX | r/m8 | AL | AH |
| DX:AX | r/m16 | AX | DX |

```asm
mov ax, 1234H
mov bx, 10H
div bx                   ; AX = 123h (quotient), DX = 4 (remainder)
```

### 3.8 Multi-Step Arithmetic Example

Computing weighted values and storing results:

```asm
MOV BL, 2
MOV AL, x                ; x = 2
MUL BL                   ; AL = 4
MOV [arr[0]], AL         ; arr[0] = 4

XOR AL, AL               ; clear AL
MOV BL, 4
MOV AL, y                ; y = 4
MUL BL                   ; AL = 16
MOV [arr+1], AL          ; arr[1] = 16

MOV BL, 6
MOV AL, z                ; z = 8
MUL BL                   ; AL = 48
MOV [arr+2], AL          ; arr[2] = 48
```

### 3.9 Clearing a Register (Multiple Methods)

```asm
mov al, 0                ; Method 1: immediate zero
xor al, al               ; Method 2: XOR (preferred, 2 bytes)
and al, 0                ; Method 3: AND with zero
sub al, al               ; Method 4: subtract from self
```

---

## 4. Flags & Status Register

The FLAGS register is a 16-bit register where individual bits indicate the result status of arithmetic/logic operations.

### 4.1 Key Flags

| Flag | Bit | Set When |
|------|-----|----------|
| CF (Carry) | 0 | Unsigned overflow/underflow |
| ZF (Zero) | 6 | Result is zero |
| SF (Sign) | 7 | Result is negative (bit 7 = 1) |
| OF (Overflow) | 11 | Signed overflow |
| PF (Parity) | 2 | Result has even number of 1-bits |

### 4.2 Carry Flag Behavior

```asm
mov AL, 255              ; AL = FFh
add AL, 1                ; AL = 00h, CF = 1 (unsigned overflow)
```

When `255 + 1 = 256` exceeds the 8-bit unsigned range (0–255), the result wraps to `00h` and CF is set.

### 4.3 Zero Flag Behavior

```asm
mov AL, 0
add al, 1                ; AL = 1, ZF = 0 (result ≠ 0)
```

ZF is set when the result of an operation equals zero.

### 4.4 Overflow Flag (Signed)

```asm
mov AL, 127              ; AL = 7Fh (maximum positive signed byte)
mov AL, 1                ; adding would cause signed overflow if added to 127
```

OF is set when a signed result cannot fit in the destination size (e.g., 127 + 1 = 128, which is -128 in signed 8-bit).

### 4.5 Practical Flag Application — Average of 3 Marks

```asm
ADD AX, marks            ; AX += marks[0]
ADD AX, marks[1]         ; AX += marks[1]
ADD AX, marks[2]         ; AX += marks[2]
MOV BL, 3
DIV BL                   ; AL = quotient (average), AH = remainder
MOV avg, BL
```

---

## 5. Conditional & Unconditional Jumps

### 5.1 Unconditional Jump (JMP)

Transfers execution to a labeled address unconditionally.

```asm
jmp l1                   ; skip next instruction
dec bl                   ; this is skipped

l1:
    inc bl               ; execution resumes here
```

### 5.2 Multi-Jump Flow

JMP can redirect execution across multiple labels:

```asm
MOV AX, 5
MOV BX, 2
JMP S1                   ; jump to S1

Back: INC AX
JMP S2

S1: SUB AX, BX           ; AX = 3
JMP Back                 ; jump to Back → AX = 4

S2: DEC BX               ; BX = 1
```

**Final state:** AX = 0004h, BX = 0001h

### 5.3 Conditional Jumps — Carry-Based

Conditional jumps test flag states set by prior CMP or arithmetic instructions.

```asm
stc                      ; CF = 1
jc step1                 ; jump if CF = 1
jnc step2                ; jump if CF = 0 (not taken)

step1:
    mov bl, 1
    jmp ex

step2:
    mov bl, 2

ex:
```

### 5.4 Conditional Jumps — Comparison-Based

**Unsigned comparisons (JA/JB):**

```asm
mov al, x                ; x = 4
mov al, y                ; y = 21
ja l1                    ; jump if above (CF=0 and ZF=0)
jb l2                    ; jump if below (CF=1)
jc l3                    ; jump if carry

l1: mov z, 1; jmp exit
l2: mov z, 2; jmp exit
l3: mov z, 3
exit:
```

**Signed comparisons (JG/JL):**

```asm
mov al, x                ; x = 4
mov al, y                ; y = 21
jG l1                    ; jump if greater (signed)
jL l2                    ; jump if less (signed)
jc l3

l1: mov z, 1; jmp exit
l2: mov z, 2; jmp exit
l3: mov z, 3
exit:
```

### 5.5 Jump Instruction Reference

| Instruction | Condition | Description |
|------------|-----------|-------------|
| `JMP` | Always | Unconditional jump |
| `JC` | CF = 1 | Jump if carry |
| `JNC` | CF = 0 | Jump if no carry |
| `JZ` / `JE` | ZF = 1 | Jump if zero / equal |
| `JNZ` / `JNE` | ZF = 0 | Jump if not zero / not equal |
| `JA` | CF=0 and ZF=0 | Jump if above (unsigned) |
| `JAE` / `JNB` | CF = 0 | Jump if above or equal (unsigned) |
| `JB` / `JNAE` | CF = 1 | Jump if below (unsigned) |
| `JBE` / `JNA` | CF=1 or ZF=1 | Jump if below or equal (unsigned) |
| `JG` / `JNLE` | ZF=0 and SF=OF | Jump if greater (signed) |
| `JGE` / `JNL` | SF = OF | Jump if greater or equal (signed) |
| `JL` / `JNGE` | SF ≠ OF | Jump if less (signed) |
| `JLE` / `JNG` | ZF=1 or SF≠OF | Jump if less or equal (signed) |

---

## 6. Loops

### 6.1 The LOOP Instruction

The `LOOP` instruction uses `CX` as an implicit counter. On each iteration it:
1. Decrements CX by 1
2. Jumps to the label if CX ≠ 0

```asm
MOV CX, 3                ; loop counter
L1:
    ADD AL, 2
    INC BL
    LOOP L1              ; CX = CX - 1; if CX ≠ 0, jump to L1
```

### 6.2 Loop Counter Underflow Behavior

When CX starts at 0, decrementing produces `0 - 1 = 0FFFFh` (65535 unsigned), causing the loop to execute 65535 times:

```asm
MOV AX, 0
MOV CX, 0                ; counter = 0
L1:
    INC AX
    LOOP L1              ; executes 65535 times
; AX = FFFFh, CX = 0000h
```

This is a common pitfall — always ensure CX is properly initialized.

### 6.3 Array Processing with LOOP

**Populating and summing a 16-element array:**

```asm
lea SI, DATA
MOV CX, 16
MOV DI, 0H

clacArray:
    MOV [SI], DI         ; store current index as value
    ADD AL, [SI]         ; accumulate sum
    INC SI
    INC DI
    LOOP clacArray

MOV SUM, AL              ; store sum
MOV DL, 16
DIV DL                   ; AL = average
MOV AVG, AX
```

### 6.4 Array Copy

```asm
MOV CX, 6
MOV SI, 0

CopyTo:
    MOV AL, DATA[SI]     ; read from source
    MOV COPY[SI], AL     ; write to destination
    INC SI
    LOOP CopyTo
```

### 6.5 Word Array Summation

```asm
MOV CX, 10
MOV SI, 0

SumArray:
    MOV AX, DATA[SI]     ; load word
    ADD SUM, AX          ; accumulate (word addition)
    INC SI               ; SI increments by 1 (byte offset, not word)
    LOOP SumArray
```

### 6.6 Even/Odd Array Fill with Swap

A comprehensive example demonstrating parallel array operations:

```asm
lea SI, EData
lea DI, OData
mov CX, 50
mov bl, 00H              ; even counter
mov bh, 01H              ; odd counter
mov AX, 0000H
mov DX, 0000H

EvenOdd:
    mov [si], bl          ; store even number
    mov [di], bh          ; store odd number
    add bl, 2             ; next even
    add bh, 2             ; next odd
    add ax, [si]          ; sum even array
    add dx, [di]          ; sum odd array
    add si, 2             ; word-sized increment
    add di, 2
    LOOP EvenOdd

; Compute averages
MOV SumE, AX
MOV SumO, DX
MOV AX, SumE
MOV BL, 50
DIV BL                   ; AvgE quotient in AL, remainder in AH
MOV AvgEQ, AH            ; remainder (fractional part)
MOV AvgER, AL            ; quotient (integer part)

; Swap arrays
lea SI, EData
lea DI, OData
MOV CX, 50

SWAP:
    MOV AX, [SI]
    XCHG AX, [DI]        ; exchange
    MOV [SI], AX
    add SI, 2
    add DI, 2
    LOOP SWAP
```

### 6.7 Nested Loops

When a loop is nested inside another, the outer loop's CX must be saved and restored since the inner loop overwrites CX:

```asm
MOV CX, COUNT            ; outer loop count = 5

L1:
    INC BL               ; BL increments once per outer iteration
    MOV COUNT, CX        ; save outer CX

    MOV CX, 2            ; inner loop count
    L2:
        INC AL           ; AL increments twice per outer iteration
        LOOP L2

    MOV CX, COUNT        ; restore outer CX
    LOOP L1
```

**Result:** AL = 0Ah (5 × 2 = 10), BL = 05h

### 6.8 Factorial Calculation (LOOP with CMP)

```asm
mov ah, 01H
int 21H                   ; read character from input
SUB al, '0'              ; convert ASCII to integer
mov ah, 0
mov CX, AX               ; CX = input number

Continue:
    CMP CX, 1
    JLE STOP              ; if CX ≤ 1, done
    MOV BX, CX
    DEC BX                ; BX = CX - 1
    MUL BX                ; AX = AX × BX
    DEC CX
    JMP Continue

STOP:
    mov F, AX             ; store factorial result
```

---

## 7. Input/Output, Procedures & Macros

### 7.1 DOS Interrupt — Character Input (INT 21h, AH=01h)

Reads a single character from standard input with echo. The character is returned in `AL`.

```asm
mov ah, 01h
int 21h                   ; AL = input character (ASCII)
```

### 7.2 BIOS Interrupt — Character Output (INT 10h, AH=0Eh)

Displays a character in `AL` at the current cursor position:

```asm
mov ah, 0Eh
int 10h                   ; display character in AL
```

### 7.3 Single Character Case Conversion

```asm
call change

change proc
    mov ah, 01h
    int 21h               ; read character
    sub al, 'a'           ; subtract lowercase base
    add al, 'A'           ; add uppercase base
    mov ah, 0Eh
    int 10h               ; display converted character
    ret
endp
```

**Logic:** ASCII uppercase letters are 32 positions below lowercase. Subtracting `'a'` (61h) and adding `'A'` (41h) performs the conversion.

### 7.4 Procedures (PROC/ENDP)

Procedures are reusable code blocks invoked with `CALL` and terminated with `RET`:

```asm
call procedure_name       ; push return address, jump to procedure

procedure_name proc
    ; procedure body
    ret                   ; pop return address, return to caller
endp
```

### 7.5 Looped Character Processing with Procedure

```asm
call change

change proc
    mov cl, 6             ; process 6 characters

    loopy:
        mov ah, 01h
        int 21h           ; read character
        sub al, 'a'
        add al, 'A'       ; convert to uppercase
        mov ah, 0Eh
        int 10h           ; display
        loop loopy

    ret
endp
```

### 7.6 Macros (MACRO/ENDM)

Macros are assembler-level text substitutions — expanded at assembly time, not runtime. They accept parameters and are invoked by name:

```asm
change macro pl           ; macro with parameter 'pl'
    mov cl, pl            ; set loop count from parameter

    loopy:
        mov ah, 01h
        int 21h
        sub al, 'a'
        add al, 'A'
        mov ah, 0Eh
        int 10h
        loop loopy
endm

change 7                  ; invoke macro with argument 7
ret
```

**Procedure vs. Macro:**
- Procedures use `CALL`/`RET` — code exists once, jumped to at runtime
- Macros expand inline — code is duplicated at each invocation

### 7.7 Port I/O (IN/OUT)

Direct communication with hardware ports:

```asm
in ax, 125               ; read word from port 125 into AX
mov al, 1
out 127, al              ; write byte 1 to port 127
```

- `IN` reads from a hardware port into a register
- `OUT` writes from a register to a hardware port
- Port addresses are 8-bit (0–255) for byte operations, or use `DX` for 16-bit port addresses

---

## 8. Homework & Applied Projects

### 8.1 Practice 1 — Constants, Variables & Arrays

**Objective:** Define constants and variables, move values between registers and memory, and populate arrays.

```asm
org 100h

K1 EQU 45H               ; 8-bit constant
K2 EQU 7B9EH             ; 16-bit constant

Mov BX, K1               ; BX = 0045h
Mov DX, K2               ; DX = 7B9Eh
Mov CX, data1            ; CX = 5A3Ch
LEA AX, data1            ; AX = offset of data1

; Store variable values into array
MOV [vals], K1
MOV [vals+1], K2
MOV [vals+3], AX

; Store register values into array
MOV [regs], AX
MOV [regs+2], BX
MOV [regs+4], CX
MOV [regs+6], DX

ret

data1 DW 5A3Ch
vals DW 0, 0, 0          ; K1, K2, data1
regs DW 0, 0, 0, 0       ; AX, BX, CX, DX
```

### 8.2 Practice 2 — Constants, Variables & Register Operations

**Objective:** Move constants into registers, use LEA for address loading, and populate arrays from multiple sources.

```asm
org 0h

MOV AX, V1               ; AX = 0076h
MOV CX, V2               ; CX = 8AD6h
MOV DX, num1             ; DX = A5C2h
lea BX, num1             ; BX = offset of num1

MOV [nums], V1
MOV [nums+2], V2
MOV [nums+4], DX

MOV [addr], AX
MOV [addr+2], CX
MOV [addr+4], DX
MOV [addr+6], BX

ret

V1 EQU 0076H
V2 EQU 8AD6H
num1 DW 0A5C2H
nums DW 3 DUP(?)
addr DW 4 DUP(?)
```

### 8.3 Practice 3 — Addressing Modes & Memory Operations

**Objective:** Define constants and variables, perform register operations, load effective addresses, and populate arrays.

```asm
org 100h

V1 EQU 0A6H              ; 8-bit constant
V2 EQU 07B84H            ; 16-bit constant

Mov BL, V1               ; BL = A6h
Mov DX, V2               ; DX = 7B84h
Mov CX, data1            ; CX = DA53h
LEA AX, data1            ; AX = offset of data1

MOV [values], V1
MOV [values+2], V2
MOV [values+4], AX

MOV [regs], AX
MOV [regs+2], BX
MOV [regs+4], CX
MOV [regs+6], DX

ret

data1 DW 0DA53H
values DW 0, 0, 0
regs DW 0, 0, 0, 0
```

### 8.4 Homework — Array Element Classification

**Objective:** Examine an array and count positive, negative, and zero values.

```asm
lea SI, Temps
mov CX, 10

Count:
    cmp [SI], 0
    JZ ZERO
    JL NEGATIVE

    POSITIVE:
        INC PositiveCounter
        JMP Continue

    ZERO:
        INC ZeroCounter
        JMP Continue

    NEGATIVE:
        INC NegativeCounter
        JMP Continue

    Continue:
        INC SI
        LOOP Count

ret

Temps DB -5, 0, 12, -8, 7, 0, -1, 3, 0, 9
PositiveCounter DB 0
NegativeCounter DB 0
ZeroCounter DB 0
```

### 8.5 Homework — Range Validation

**Objective:** Verify array elements fall within an allowed range (5–20). Set ERROR=1 if out of range.

```asm
lea SI, RecivedData
mov CX, 8

Exchange:
    cmp [SI], 5
    JL IncorrectValue

    cmp [SI], 20
    JG IncorrectValue

    INC SI
    LOOP Exchange

JMP DONE

IncorrectValue:
    MOV ERROR, 1

DONE:
ret

RecivedData DB 4, 6, 15, 21, 10, 8, 5, 19
ERROR DB 0
```

### 8.6 Homework — Grade Average & Pass/Fail

**Objective:** Calculate average grade, count passing subjects (≥50), and determine pass/fail status.

```asm
mov cx, 6
lea si, Grades
mov ax, 0
mov bx, 0

student:
    mov ax, [si]
    add Sum, ax

    cmp ax, 50
    jl skip_pass
    inc PassCounter

skip_pass:
    add si, 2
    LOOP student

    mov ax, Sum
    mov cl, 6
    div cl                  ; AL = average
    mov Avg, ax

    mov al, 6
    sub al, [PassCounter]   ; failed subjects
    cmp al, 2
    ja set_failed

    mov Pass, 1             ; passed
    jmp done

set_failed:
    mov Pass, 0             ; failed

done:
    ret

Grades DW 45, 60, 30, 80, 55, 70
SUM DW 0
AVG DW 0
PASS DB 0
PassCounter DB 0
```

---

## Appendix: Instruction Quick Reference

| Category | Instructions |
|----------|-------------|
| Data Transfer | `MOV`, `LEA`, `XCHG`, `IN`, `OUT` |
| Arithmetic | `ADD`, `ADC`, `SUB`, `MUL`, `IMUL`, `DIV` |
| Logic | `AND`, `OR`, `XOR`, `NOT`, `SHL`, `SHR` |
| Flag Control | `STC`, `CLC`, `CMC`, `CLD`, `STD` |
| Comparison | `CMP`, `TEST` |
| Jumps | `JMP`, `JC`, `JNC`, `JZ`, `JNZ`, `JA`, `JB`, `JG`, `JL`, `JE`, `JNE` |
| Loops | `LOOP`, `LOOPE`, `LOOPNE` |
| Stack | `PUSH`, `POP`, `CALL`, `RET` |
| String | `MOVSB`, `MOVSW`, `CMPSB`, `SCASB` |
| Interrupt | `INT`, `IRET` |

---

*This manual is derived entirely from the author's Assembly language coursework, practice exercises, and homework implementations using the emu8086 environment. All code examples represent original work and study materials.*
