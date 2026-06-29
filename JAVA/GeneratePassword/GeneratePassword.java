/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
package s.generatepassword;

import java.util.Scanner;

/**
 *
 * @author Abdulrahman
 */
public class GeneratePassword {

    private static Scanner scanner = new Scanner(System.in);

    private static String readString(String message) {
        System.out.print(message);
        return scanner.nextLine();
    }

    public static void printBorder(int borderLength) {
        System.out.println();
        System.out.println("=".repeat(borderLength));
        System.out.println();
    }

    public static void printTextInBorder(String message, int borderLength) {
        printBorder(borderLength);
        System.out.print(" " + message + " ");
        printBorder(borderLength);
    }

    private static boolean IsValidPasswordLength(String Password) {
        return Password.length() >= 10;
    }

    private static boolean IsValidPasswordType(String Password) {
        for (char c : Password.toCharArray()) {
            if (!Character.isLetterOrDigit(c)) { // !(A||B) -> !Character.isDigit(c) && !Character.isLetter(c)
                return false;
            }
        }
        return true;
    }

    private static short countLettersInPassword(String Password) {
        short counter = 0;

        for (char c : Password.toCharArray()) {
            if (Character.isLetter(c)) {
                counter++;
            }
        }
        return counter;
    }

    private static boolean IsValidPasswordLettersCount(String Password) {
        return countLettersInPassword(Password) >= 2;
    }

    private static String ReadValidPassword() {
        String Password = readString("\nEnter a password please: ");
        while (!IsValidPasswordLength(Password) || !IsValidPasswordType(Password) || !IsValidPasswordLettersCount(Password)) {
            printTextInBorder(("\t\t Invalid Password!\n\n"
                    + " * Password rules: \n"
                    + " 1. A password must have at least ten characters. \n"
                    + " 2. A password consists of only letters and digits. \n"
                    + " 3. A password must contain at least two digits.\n"), 52);

            Password = readString("\nEnter a password please: ");
        }
        return Password;
    }

    public static void main(String[] args) {
        String Password = ReadValidPassword();

        printTextInBorder("Valid Password\n",16);
    }
}