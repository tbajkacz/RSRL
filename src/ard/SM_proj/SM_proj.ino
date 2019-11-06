#include <SPI.h>
#include <MFRC522.h>

#define czas_trwania 5000
const byte UID[] = {0xB5, 0x61, 0x2B, 0x77};

MFRC522 rfid(10, 9);
MFRC522::MIFARE_Key key;
boolean stan = false;
unsigned long czas;

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  pinMode(2, OUTPUT);
}

void loop() {
  if (rfid.PICC_IsNewCardPresent() && rfid.PICC_ReadCardSerial())
  {
    if (rfid.uid.uidByte[0] == UID[0] && 
        rfid.uid.uidByte[1] == UID[1] &&
        rfid.uid.uidByte[2] == UID[2] &&
        rfid.uid.uidByte[3] == UID[3])
    {
      Serial.println("Poprawny");
      stan = true;
      czas = millis() + czas_trwania;
    } else
    {
      Serial.println("Niepoprawny");
      stan = false;
    }
    rfid.PICC_HaltA();
    rfid.PCD_StopCrypto1();
  }

  if (stan && czas < millis())
    stan = false;

  digitalWrite(2, stan)  ;
}
