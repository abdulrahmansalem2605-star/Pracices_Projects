#include <iostream>
#include <vector>
#include <string>
#include <cctype>
using namespace std;

string ReadString(string message)
{
	string text;
	cout << message;
	getline(cin, text);
	return text;
}

const unsigned short H = 7;
const unsigned short W = 7;

//-----------------------<Draw_Letters>-----------------------
string drawA() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if ((j == 0 || j == W - 1) && i != 0 || i == 0 && j > 0 && j < W - 1 || i == H / 2)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawB() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || (i == 0 || i == H / 2 || i == H - 1) && j < W - 1 || j == W - 1 && i != 0 && i != H / 2 && i != H - 1)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawC() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || i == H - 1 || j == 0)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawD() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || (i == 0 || i == H - 1) && j < W - 1 || j == W - 1 && i != 0 && i != H - 1)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawE() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || i == 0 || i == H / 2 || i == H - 1)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawF() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || i == 0 || i == H / 2)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawG() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || i == H - 1 || j == 0 || (i >= H / 2 && j == W - 1) || (i == H / 2 && j >= W / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawH() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || j == W - 1 || i == H / 2)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawI() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || i == H - 1 || j == W / 2)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawJ() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || j == W / 2 || (i == H - 1 && j <= W / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawK() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || j == i - H / 2 || j == H / 2 - i)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawL() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || i == H - 1)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawM() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || j == W - 1 || (i == j && j <= W / 2) || (i + j == W - 1 && j >= W / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawN() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || j == W - 1 || i == j)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawO() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if ((i == 0 || i == H - 1) && j > 0 && j < W - 1 || (j == 0 || j == W - 1) && i > 0 && i < H - 1)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawP() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || i == 0 || i == H / 2 || (j == W - 1 && i < H / 2 && i != 0))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawQ() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if ((i == 0 || i == H - 2) && j > 0 && j < W - 1 || (j == 0 || j == W - 1) && i > 0 && i < H - 2 || (i == j && i > H / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawR() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || i == 0 || i == H / 2 || (j == W - 1 && i < H / 2 && i != 0) || (i - H / 2 == j - 1 && i > H / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawS() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || i == H / 2 || i == H - 1 || (i < H / 2 && j == 0) || (i > H / 2 && j == W - 1))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawT() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || j == W / 2)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawU() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if ((j == 0 || j == W - 1) && i < H - 1 || i == H - 1 && j > 0 && j < W - 1)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawV() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if ((j == i && i <= H / 2) || (j == W - 1 - i && i <= H / 2) || (i > H / 2 && j == W / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawW() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == 0 || j == W - 1 || (i == j && i >= H / 2) || (i + j == W - 1 && i >= H / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawX() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (j == i || j == W - 1 - i)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawY() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if ((j == i && i < H / 2) || (j == W - 1 - i && i < H / 2) || (j == W / 2 && i >= H / 2))
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}

string drawZ() {
	string line = "";
	for (int i = 0; i < H; ++i) {
		for (int j = 0; j < W; ++j) {
			if (i == 0 || i == H - 1 || j == W - 1 - i)
				line.push_back('*');
			else
				line.push_back(' ');
		}
		line.push_back('\n');
	}
	return line;
}
//-----------------------<\Draw_Letters>-----------------------

string(*drawFunctions[26])() = {
	drawA, drawB, drawC, drawD, drawE, drawF, drawG, drawH, drawI,
	drawJ, drawK, drawL, drawM, drawN, drawO, drawP, drawQ, drawR,
	drawS, drawT, drawU, drawV, drawW, drawX, drawY, drawZ
};

bool HasNonAlphabet(string Name)
{
	for (char letter : Name)
	{
		if (!isalpha(letter))
		{
			return false;
		}
	}
	return true;
}

string ReturnAlphabetString()
{
	string Name = ReadString("\nEnter Your name please: ");

	while (!HasNonAlphabet(Name))
	{
		printf("\n\nThe name must not contain a non-alphabetic letter. Try agian please...\n\n");

		Name = ReadString("\nEnter Your name please: ");
	}

	return Name;
}

void Implement_Program()
{
	string Name = ReturnAlphabetString();

	vector<string> letters;

	for (char letter : Name)
	{
		letters.push_back(drawFunctions[toupper(letter) - 'A']());
	}

	cout << endl << endl << endl;

	for (int row = 0; row < H; ++row) {
		for (const string& letter : letters) {
			for (int col = 0; col < W; ++col) {
				cout << letter[row * (W + 1) + col];
			}
			cout << "\t\t";
		}
		cout << endl;
	}
}

void main()
{
	system("color 5F");
	Implement_Program();
}