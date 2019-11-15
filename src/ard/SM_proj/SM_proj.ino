#include <PinChangeInterrupt.h>
#include <OneWire.h>

#define LED_R 6
#define LED_G 7
#define LED_B 8
#define PIR 5
#define transmitter 4

#include <SPI.h>
#include <MFRC522.h>

#define czas_trwania 5000
const byte UID[] = {0xB5, 0x61, 0x2B, 0x77};

MFRC522 rfid(10, 9);
MFRC522::MIFARE_Key key;
boolean stan = false;
unsigned long czas;
int movementDetection = 0;

void setup() {
  pinMode(PIR, INPUT);
  pinMode(LED_R, OUTPUT);
  pinMode(LED_G, OUTPUT);
  pinMode(LED_B, OUTPUT);
  pinMode(transmitter, OUTPUT);
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();

  digitalWrite(LED_R, LOW);
  digitalWrite(LED_G, LOW);
  digitalWrite(LED_B, LOW);
  digitalWrite(transmitter, HIGH);
  
  attachPinChangeInterrupt(digitalPinToPinChangeInterrupt(PIR), movementDetect, RISING);
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

  digitalWrite(transmitter, stan)  ;

}

 void movementDetect()
{
  //zapal leda
}
