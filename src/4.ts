class Key {
  constructor(private signature: number = Math.random()) {}

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  constructor(
    protected key: Key,
    protected door: boolean = false,
    protected tenants: Person[] = []
  ) {}

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): void;
}

// abstract class House {
//   door: boolean;
//   key: Key;
//   tenants: Person[];

//   constructor(key: Key) {
//     this.door = false;
//     this.key = key;
//     this.tenants = [];
//   }

//   comeIn(person: Person): void {
//     if (this.door) {
//       this.tenants.push(person);
//     }
//   }

//   abstract openDoor(key: Key): void;
// }
// Можливо властивості абстрактого класу було б правильніше так записати. В умові не сказано які мають бути властивочті.
// Просто хотілось щоб скрізь був однаковий, скорочений, синтаксис, а як я розумію в такому випадку в конструкторі обовязково має
// бути вказано тип властивості(public, private, protected).

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);
person.getKey();

house.openDoor(person.getKey());

house.comeIn(person);

export {};
