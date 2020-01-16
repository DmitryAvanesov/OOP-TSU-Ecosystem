class Human extends Omnivore {
    private partner: Human | undefined;

    constructor(currentField: Field) {
        super(currentField);

        this.name = "human";
        this.maxHealth = 15;
        this.health = this.maxHealth;
        this.maxAge = 30;
        this.pace = 1000;
        this.reproductionProbability = 0.05;

        this.CheckEating();
    }

    public FindPartner() {
        var contenders: Array<Omnivore> = this.field.omnivoreAnimals;
        var currentContender: number = 0;

        while (currentContender < contenders.length) {
            if (!(contenders[currentContender] instanceof Human) || (this.male && contenders[currentContender].male) || (!this.male && !contenders[currentContender].male)) {
                contenders.splice(currentContender, 1);
            }
            else {
                currentContender++;
            }
        }

        this.partner = contenders[Math.floor(Math.random() * contenders.length)] as Human;
        this.partner.partner = this;
    }
}