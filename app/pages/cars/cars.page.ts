import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {IonContent} from '@ionic/angular'
import { car, CarsService } from '../../Service/cars.service';


@Component({
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'], 
})
export class CarsPage implements OnInit {
  @ViewChild (IonContent , { static: true })
  content: any;
  Cars:any[]=[];
  constructor(public router: Router,public CarsSrv:CarsService) { 
    CarsSrv.Get_fav_ID();
    // this.upload_Cars();


    CarsSrv.getFirst10Rows().then((res)=>{
      if(res){
      this.Cars=res;
      console.log(this.Cars);

      }
    });
  }

  ngOnInit() {
  }

  show_filter = false;
  Available_adv = true;
  filter = false;
  new= false; // 
  old= false; //

  first_year:any; //
  last_year: any; //
  start_budget:any; // got it
  end_budget:any; // got it
  New_cars:any; // 
  Old_cars:any; // 
  car_selected_brand: any; // got it
  choosed_filter_cars: any[] = []; // models

  display_models = false;
  display_cars = false;
  temp: any[] = [];
  id: any = 'Toyota';

  car_models_display: any[] = [];
  

  add_filter_car(car:any){
    var add = true;
    for(var i=0; i<this.choosed_filter_cars.length; i++){
      if(this.choosed_filter_cars[i]== car){
        this.choosed_filter_cars.splice(i, 1);
        add = false;
      }
    }
    if(add){
      this.choosed_filter_cars.push(car);
    }
  }
  

  filter_cars(){
    this.CarsSrv.filter_cars(this.first_year, this.last_year, this.start_budget, this.end_budget,
                             this.New_cars, this.Old_cars,this.car_selected_brand,
                             this.choosed_filter_cars);
    
    this.show_filter = true;

  }

// our cars list 

  upload_Cars(){
    this.cars_info.forEach(element => {
      this.temp = [];
      element.Models.forEach((car: any) =>{
        this.temp.push(car);
      });
       this.CarsSrv.updateCars(element.brand , element);
    });
    
  }

  cars_info: any[] = [
                    {brand: "Toyota", Models: ["4Runner", "86", "Aurion", "Avalon", "Avensis", "Camry", "Celica", "Corolla", "Cressida", "Crown", "Echo", "FJ Cruser", "Fortuner", "Hiace", "Highlander", "Hillux", "IQ", "Innova", "Land Cruiser", "Land Cruiser 76", "Other", "Prado", "Prius", "Rav 4", "Scion", "Sequoia", "Starlet", "Supra", "Tacoma", "Tercel","Tundra", "XA", "Yaris","Zelas", "Avanza"]},
                    {brand: "Nissan", Models: ["300ZX", "350Z", "370Z", "Altima", "Armada", "Bluebird", "Datsun", "GT-R", "Golria", "Juke", "Livina", "March", "Maxima", "Micra", "Murano", "Navana", "Pathfinder", "Patrol", "Qashqai", "S130", "Sentra", "Skyline", "Sunny", "Terrano", "Tiida", "Titan", "Van", "X-Trail", "Xterra"]},
                    {brand: "Hyundai", Models: ["Accent", "Atos", "Avanti","Azera","Centennial", "Coupe", "Elantra","Entourage","Excel", "Galloper", "Genesis", "Getz", "Grandeur","H1", "H100","i10", "i20", "i30","Matrix","Other","Peny", "Santa Fe","Santamo", "Sonata", "Terracan","Tiburon", "Trajet", "Tucson", "Veloster","Velacruz","Verna","Viva"]},
                    {brand: "Lexus", Models: ["CT-Series","ES-Series", "GS-Series","GX-Series", "IS-Series","LS-Series", "LX-Series","Other","RX-Series","SC-Series"]},
                    {brand: "Honda", Models: ["Accord","CR-V","CR-X","City", "Civic","Element","HR-V","Jazz", "Legend","MIR-V","Odyssey","Other","Pickup","Pilot", "Prelude","S2000","Van"]},
                    {brand: "Mitsubishi", Models: ["3000 GT", "ASX","Colt","Diamonte", "Eclipse","Evolution", "Galant", "Grandis", "Lancer","Magna","Montero","Nativa","Other", "Outlander", "Pajero","Pickup","Van", "mirage"]},
                    {brand: "Kia", Models: ["Cadenza", "Carens", "Carnival","Cena", "Cerato", "Koup", "Mohave", "Opirus", "Optima","Other", "Picanto", "Pride", "Rio","saipa","Sedona", "Sephia", "Shuma", "Sorento", "Soul","Sepctra", "Sportage"]},
                    {brand: "Mercedes-Benz", Models: ["190","200", "200SEL","230","230E","240/260/280","280C","280E","280S","280SEL","300/350/380","300SEL","400/420","500/560","500SEL", "A-Class", "A140", "A150", "B-Class", "B150", "C-Class", "C180", "C200", "C240", "C250", "CL-Class","CLK-Class", "CLS","E-Class", "E200", "E200 Kompressor", "E220","E240","E250","E250","E280","E300","E320", "G-Class","GLK", "GLK-Class", "M-Class","Other","R-Class", "S-Class", "S350", "S500", "SL-Class", "SL320", "SLK-Class", "SLR-Class","SLR","SLS", "Viano"]},
                    {brand: "BMW", Models: ["1-Series","2-Series","3-Series","4-Series","5-Series","6-Series","7-Series","8-Series", "M-Coupe", "M-Roadster","M3","M5", "M6","Other","X1","X3", "X5", "X6", "Z3", "Z4", "Z8",""]},
                    {brand: "Ford", Models: ["Aerostar", "Bronco", "Crown Victoria","Edge","Escape", "Escort", "Excursion", "Explorer","F-Series Pickup", "F150", "Fiesta", "Figo", "Five Hunderd","Flex", "Focus","Fusion", "GT",  "Ka", "Mondeo", "Mustang","Other","Ranger","Taurus","Thunderbird", "Van"]},
                    {brand: "Chevrolet", Models: ["Astro","Avalanche", "Aveo","Blazer", "Camaro","Caprice","Caprice Classic", "Captiva","Cavalier", "Corvette", "Cruze", "Epica", "Explorer","Frontera","Impala","Lanos", "Lumina", "Malibu", "N200","Optra","Other","Pickup","SSR","Silverado","Sonic", "Spark", "Sprint","Suburban", "Tahoe", "Trailblazer", "Traverse","Uplander"]},
                    {brand: "Jeep", Models: ["Cherokee","Commanche", "Commander", "Compass", "Grand Cherokee","Liberty","Other", "Patriot", "Renegade", "Wrangler"]},
                    {brand: "Land Rover", Models: ["Defender", "Discovery","Evoque", "Freelander","HSE V8","LR2","LR3","LR4","Other", "Range Rover", "Range Rover Sport"]},
                    {brand: "Mazda", Models: ["121", "2", "3", "323","6", "626", "929", "CX-7", "CX-9", "MPV", "MX-5","Miata","Navajo","Other", "Pickup","Protege", "RX-7", "RX-8", "Tribute"]},
                    {brand: "Audi", Models: ["A1","A3", "A4", "A5", "A6","A7", "A8","Other", "Q3", "Q5", "Q7", "R8", "RS6", "S3/RS3", "S4/RS4", "S5/RS5", "S7/RS7", "S8", "TT", "TT Coupe"]},
                    {brand: "Volkswagen", Models: ["Amarok", "Beetle", "Bora", "Caddy", "Caravelle", "CC", "CrossFox", "Eos","Eurovan","GTI", "Golf", "Golf R", "Jetta", "Multivan", "Other", "Parati", "Passat", "Phaeton", "Pointer", "Polo","Scirocco", "Sharan","Souran", "Tiguan", "Touareg", "Transporter","Vento"]},
                    {brand: "GMC", Models: ["Acadia", "Envoy", "Jimmy", "Other", "Sierra", "Suburban", "Terrain", "Yukon"]},
                    {brand: "Porsche", Models: ["911","944", "968", "Boxster","Carrera", "Cayenne", "Cayman", "Other", "Panamera"]},
                    {brand: "Dodge", Models: ["Avenger", "Caliber", "Challenger", "Charger","Durango", "Magnum","Neon", "Nitro","Other","Pickup", "RAM", "Van", "Viper"]},
                    {brand: "Chepry", Models: ["A 11", "Envy", "Long", "Other", "QQ", "Tiggo"]},
                    {brand: "Infiniti", Models: ["EX35", "FX45/FX35", "G-Series", "I35/I30","J30","JX-Series", "M-Series","Other", "Q45", "QX4","QX56"]},
                    {brand: "Renault", Models: ["11", "18", "19", "5", "9", "Clio", "Dacia", "Duster", "Fluence", "Koleos", "Laguna", "Logan", "Megan", "Megane", "Optima","Other","Safrane","Sandero","Scenic","Symbol","Twingo","Rainbow"]},
                    {brand: "Jaguar", Models: ["Other", "S-Type", "X-Type","XF",  "XJ12", "XJ6", "XJ8", "XJR","XJS", "XK", "XK8", "XKR"]},
                    {brand: "MG", Models: ["C 350", "MG 3", "MG 3 Cross Over", "MG 5", "MG 750", "Other", "S350"]},
                    {brand: "Suzuki", Models: ["APV", "Alto", "Baleno", "Celerio", "Grand Vitara", "Jimny","Other", "SX4","Super Carry","Swift", "Vitara", "XL7"]},
                    {brand: "Subaru", Models: ["BRZ", "Forester", "Impreza", "Legacy", "Other", "Outback", "Tribeca",  "WRX"]},
                    {brand: "Skoda", Models: ["Fabia", "Favorit", "Felicia","Forman","GLS-120", "Octavia", "Other", "Roomster","Superb"]},
                    {brand: "Ssang Yong", Models: ["Musso", "Other"]},
                    {brand: "Volvo", Models: ["144", "240","244", "340", "460","Other", "C30", "S40", "S60", "S80", "XC60", "XC70", "XC90"]},
                    {brand: "Geely", Models: ["CK", "CK2", "Emgrand 7", "Englon", "Frota", "MK", "Other", "Pandido", "X Pandido"]},
                    {brand: "Chrysler", Models: ["200/200C EV", "300M/300C","Concorde", "Crossfire", "M300", "Neon","Other", "Pacifica", "Prowler", "PT Cruiser", "Sebring", "Town & Country", "Voyager/Caravan"]},
                    {brand: "Peugeot", Models: ["104", "106","204", "205", "206", "207",  "3008","304","305", "307", "308", "405", "406", "407", "408", "5008","504","505", "508", "605", "607", "Other", "RC7", "RCZ"]},
                    {brand: "Citroen", Models: ["AX", "Berlingo","C3", "C4", "C5", "C8", "Jumpy", "Other", "Picasso", "Xantia", "Xsara" ,"Xsara Picasso", "ZX"]},
                    {brand: "Isuzu", Models: ["Amigo", "Ascender", "Axiom", "D-Max", "I-Mark", "Oasis", "Other", "Rodeo", "Stylus", "Trooper"]},
                    {brand: "Alfa Romeo", Models: ["145/146/147", "155/159", "166", "Brera", "GTV/GT", "Mito", "Other", "Spider"]},
                    {brand: "Daihatsu", Models: ["Applause", "Charade", "Gran Trios", "Kancil", "Materia", "Mira", "Other", "Rocky", "Sirion", "Terios", "YRV"]},
                    {brand: "Hummer", Models: ["H1","H2","H3","HX","Other"]},
                    {brand: "MINI", Models: ["Cabrio", "Clubman", "Cooper", "Cooper S", "Countryman", "John Cooper Works", "Other"]},
                    {brand: "Opel", Models: ["Astra", "Calibra", "Corsa", "Kadett", "Omega","Other", "Signum", "Vectra", "Vita"]},
                    {brand: "Rover", Models: ["75", "Other"]},
                    {brand: "Proton", Models: ["Gen-2", "Other", "Persona", "Saga", "Waja", "Wira"]},
                    {brand: "BYD", Models: ["F0", "F3", "F3 R", "Flyer", "L3", "Other"]},
                    {brand: "Fiat", Models: ["124","125", "126","127","128","128 Nova","131","132", "500","Argenta", "Barchetta", "Brava", "Florida", "Grande Punto", "Linea", "Marea","Multipla","Other", "Palio", "Petra", "Polonez", "Punto", "Regata", "Ritmo", "Sienna", "Tempra", "Uno", "Zastava"]},
                    {brand: "Saipa", Models: ["Other", "Pride", "Pride Sedan", "Tiba"]},
                    {brand: "Brilliance", Models: ["FRV", "FRV Cross", "FSV", "Galena", "H330", "Other", "Splendor", "V3"]},
                    {brand: "Daewoo", Models: ["Cielo", "Espero","Juliet", "Lanos","Lanos 1", "Lanos 2", "Leganza", "Matiz", "Musso", "Nubira", "Other", "Racer", "Zaz"]},
                    {brand: "Lada", Models: ["2010", "2015", "2017", "2170", "Alico", "Niva", "Oka", "Other", "Samara"]},
                    {brand: "Seat", Models: ["132","133", "Alhambra", "Altea", "Cordoba", "Ibiza", "Leon", "Other","Toledo"]},
                    {brand: "Sepranza", Models: ["A11", "A113", "A213", "A516", "A620", "M11", "Triggo"]},
                    ];

  All_Cars: any[] = [   
                        // {brand: "Seat", Models: ["Alhambra", "Altea", "Altea XL", "Arosa", "Cordoba", "Cordoba Vario", "Exeo", "Ibiza", "Ibiza ST", "Exeo ST", "Leon", "Leon ST", "Inca", "Mii", "Toledo"]},
                        // {brand: "Renault", Models: ["Captur", "Clio", "Clio Grandtour", "Espace", "Express", "Fluence", "Grand Espace", "Grand Modus", "Grand Scenic", "Kadjar", "Kangoo", "Kangoo Express", "Koleos", "Laguna", "Laguna Grandtour", "Latitude", "Mascott", "Mégane", "Mégane CC", "Mégane Combi", "Mégane Grandtour", "Mégane Coupé", "Mégane Scénic", "Scénic", "Talisman", "Talisman Grandtour", "Thalia", "Twingo", "Wind", "Zoé"]},
                        // {brand: "Peugeot", Models: ["1007", "107", "106", "108", "2008", "205", "205 Cabrio", "206", "206 CC", "206 SW", "207", "207 CC", "207 SW", "306", "307", "307 CC", "307 SW", "308", "308 CC", "308 SW", "309", "4007", "4008", "405", "406", "407", "407 SW", "5008", "508", "508 SW", "605", "806", "607", "807", "Bipper", "RCZ"]},
                        {brand: "Dacia", Models: ["Dokker", "Duster", "Lodgy", "Logan", "Logan MCV", "Logan Van", "Sandero", "Solenza"]},
                        // {brand: "Citroën", Models: ["Berlingo", "C-Crosser", "C-Elissée", "C-Zero", "C1", "C2", "C3", "C3 Picasso", "C4", "C4 Aircross", "C4 Cactus", "C4 Coupé", "C4 Grand Picasso", "C4 Sedan", "C5", "C5 Break", "C5 Tourer", "C6", "C8", "DS3", "DS4", "DS5", "Evasion", "Jumper", "Jumpy", "Saxo", "Nemo", "Xantia", "Xsara"]},
                        // {brand: "Opel", Models: ["Agila", "Ampera", "Antara", "Astra", "Astra cabrio", "Astra caravan", "Astra coupé", "Calibra", "Campo", "Cascada", "Corsa", "Frontera", "Insignia", "Insignia kombi", "Kadett", "Meriva", "Mokka", "Movano", "Omega", "Signum", "Vectra", "Vectra Caravan", "Vivaro", "Vivaro Kombi", "Zafira"]},
                        // {brand: "Alfa Romeo", Models: ["145", "146", "147", "155", "156", "156 Sportwagon", "159", "159 Sportwagon", "164", "166", "4C", "Brera", "GTV", "MiTo", "Crosswagon", "Spider", "GT", "Giulietta", "Giulia"]},
                        // {brand: "Škoda", Models: ["Favorit", "Felicia", "Citigo", "Fabia", "Fabia Combi", "Fabia Sedan", "Felicia Combi", "Octavia", "Octavia Combi", "Roomster", "Yeti", "Rapid", "Rapid Spaceback", "Superb", "Superb Combi"]},
                        // {brand: "Chevrolet", Models: ["Alero", "Aveo", "Camaro", "Captiva", "Corvette", "Cruze", "Cruze SW", "Epica", "Equinox", "Evanda", "HHR", "Kalos", "Lacetti", "Lacetti SW", "Lumina", "Malibu", "Matiz", "Monte Carlo", "Nubira", "Orlando", "Spark", "Suburban", "Tacuma", "Tahoe", "Trax"]},
                        // {brand: "Porsche", Models: ["911 Carrera", "911 Carrera Cabrio", "911 Targa", "911 Turbo", "924", "944", "997", "Boxster", "Cayenne", "Cayman", "Macan", "Panamera"]},
                        // {brand: "Honda", Models: ["Accord", "Accord Coupé", "Accord Tourer", "City", "Civic", "Civic Aerodeck", "Civic Coupé", "Civic Tourer", "Civic Type R", "CR-V", "CR-X", "CR-Z", "FR-V", "HR-V", "Insight", "Integra", "Jazz", "Legend", "Prelude"]},
                        // {brand: "Subaru", Models: ["BRZ", "Forester", "Impreza", "Impreza Wagon", "Justy", "Legacy", "Legacy Wagon", "Legacy Outback", "Levorg", "Outback", "SVX", "Tribeca", "Tribeca B9", "XV"]},
                        // {brand: "Mazda", Models: ["121", "2", "3", "323", "323 Combi", "323 Coupé", "323 F", "5", "6", "6 Combi", "626", "626 Combi", "B-Fighter", "B2500", "BT", "CX-3", "CX-5", "CX-7", "CX-9", "Demio", "MPV", "MX-3", "MX-5", "MX-6", "Premacy", "RX-7", "RX-8", "Xedox 6"]},
                        // {brand: "Mitsubishi", Models: ["3000 GT", "ASX", "Carisma", "Colt", "Colt CC", "Eclipse", "Fuso canter", "Galant", "Galant Combi", "Grandis", "L200", "L200 Pick up", "L200 Pick up Allrad", "L300", "Lancer", "Lancer Combi", "Lancer Evo", "Lancer Sportback", "Outlander", "Pajero", "Pajeto Pinin", "Pajero Pinin Wagon", "Pajero Sport", "Pajero Wagon", "Space Star"]},
                        // {brand: "Lexus", Models: ["CT", "GS", "GS 300", "GX", "IS", "IS 200", "IS 250 C", "IS-F", "LS", "LX", "NX", "RC F", "RX", "RX 300", "RX 400h", "RX 450h", "SC 430"]},
                        // {brand: "Toyota", Models: ["4-Runner", "Auris", "Avensis", "Avensis Combi", "Avensis Van Verso", "Aygo", "Camry", "Carina", "Celica", "Corolla", "Corolla Combi", "Corolla sedan", "Corolla Verso", "FJ Cruiser", "GT86", "Hiace", "Hiace Van", "Highlander", "Hilux", "Land Cruiser", "MR2", "Paseo", "Picnic", "Prius", "RAV4", "Sequoia", "Starlet", "Supra", "Tundra", "Urban Cruiser", "Verso", "Yaris", "Yaris Verso"]},
                        // {brand: "BMW", Models: ["i3", "i8", "M3", "M4", "M5", "M6", "Rad 1", "Rad 1 Cabrio", "Rad 1 Coupé", "Rad 2", "Rad 2 Active Tourer", "Rad 2 Coupé", "Rad 2 Gran Tourer", "Rad 3", "Rad 3 Cabrio", "Rad 3 Compact", "Rad 3 Coupé", "Rad 3 GT", "Rad 3 Touring", "Rad 4", "Rad 4 Cabrio", "Rad 4 Gran Coupé", "Rad 5", "Rad 5 GT", "Rad 5 Touring", "Rad 6", "Rad 6 Cabrio", "Rad 6 Coupé", "Rad 6 Gran Coupé", "Rad 7", "Rad 8 Coupé", "X1", "X3", "X4", "X5", "X6", "Z3", "Z3 Coupé", "Z3 Roadster", "Z4", "Z4 Roadster"]},
                        // {brand: "Volkswagen", Models: ["Amarok", "Beetle", "Bora", "Bora Variant", "Caddy", "Caddy Van", "Life", "California", "Caravelle", "CC", "Crafter", "Crafter Van", "Crafter Kombi", "CrossTouran", "Eos", "Fox", "Golf", "Golf Cabrio", "Golf Plus", "Golf Sportvan", "Golf Variant", "Jetta", "LT", "Lupo", "Multivan", "New Beetle", "New Beetle Cabrio", "Passat", "Passat Alltrack", "Passat CC", "Passat Variant", "Passat Variant Van", "Phaeton", "Polo", "Polo Van", "Polo Variant", "Scirocco", "Sharan", "T4", "T4 Caravelle", "T4 Multivan", "T5", "T5 Caravelle", "T5 Multivan", "T5 Transporter Shuttle", "Tiguan", "Touareg", "Touran"]},
                        // {brand: "Suzuki", Models: ["Alto", "Baleno", "Baleno kombi", "Grand Vitara", "Grand Vitara XL-7", "Ignis", "Jimny", "Kizashi", "Liana", "Samurai", "Splash", "Swift", "SX4", "SX4 Sedan", "Vitara", "Wagon R+"]},
                        // {brand: "Mercedes-Benz", Models: ["100 D", "115", "124", "126", "190", "190 D", "190 E", "200 - 300", "200 D", "200 E", "210 Van", "210 kombi", "310 Van", "310 kombi", "230 - 300 CE Coupé", "260 - 560 SE", "260 - 560 SEL", "500 - 600 SEC Coupé", "Trieda A", "A", "A L", "AMG GT", "Trieda B", "Trieda C", "C", "C Sportcoupé", "C T", "Citan", "CL", "CL", "CLA", "CLC", "CLK Cabrio", "CLK Coupé", "CLS", "Trieda E", "E", "E Cabrio", "E Coupé", "E T", "Trieda G", "G Cabrio", "GL", "GLA", "GLC", "GLE", "GLK", "Trieda M", "MB 100", "Trieda R", "Trieda S", "S", "S Coupé", "SL", "SLC", "SLK", "SLR", "Sprinter"]},
                        {brand: "Saab", Models: ["9-3", "9-3 Cabriolet", "9-3 Coupé", "9-3 SportCombi", "9-5", "9-5 SportCombi", "900", "900 C", "900 C Turbo", "9000"]},
                        // {brand: "Audi", Models: ["100", "100 Avant", "80", "80 Avant", "80 Cabrio", "90", "A1", "A2", "A3", "A3 Cabriolet", "A3 Limuzina", "A3 Sportback", "A4", "A4 Allroad", "A4 Avant", "A4 Cabriolet", "A5", "A5 Cabriolet", "A5 Sportback", "A6", "A6 Allroad", "A6 Avant", "A7", "A8", "A8 Long", "Q3", "Q5", "Q7", "R8", "RS4 Cabriolet", "RS4/RS4 Avant", "RS5", "RS6 Avant", "RS7", "S3/S3 Sportback", "S4 Cabriolet", "S4/S4 Avant", "S5/S5 Cabriolet", "S6/RS6", "S7", "S8", "SQ5", "TT Coupé", "TT Roadster", "TTS"]},
                        // {brand: "Kia", Models: ["Avella", "Besta", "Carens", "Carnival", "Cee`d", "Cee`d SW", "Cerato", "K 2500", "Magentis", "Opirus", "Optima", "Picanto", "Pregio", "Pride", "Pro Cee`d", "Rio", "Rio Combi", "Rio sedan", "Sephia", "Shuma", "Sorento", "Soul", "Sportage", "Venga"]},
                        // {brand: "Land Rover", Models: ["109", "Defender", "Discovery", "Discovery Sport", "Freelander", "Range Rover", "Range Rover Evoque", "Range Rover Sport"]},
                        // {brand: "Dodge", Models: ["Avenger", "Caliber", "Challenger", "Charger", "Grand Caravan", "Journey", "Magnum", "Nitro", "RAM", "Stealth", "Viper"]},
                        // {brand: "Chrysler", Models: ["300 C", "300 C Touring", "300 M", "Crossfire", "Grand Voyager", "LHS", "Neon", "Pacifica", "Plymouth", "PT Cruiser", "Sebring", "Sebring Convertible", "Stratus", "Stratus Cabrio", "Town & Country", "Voyager"]},
                        // {brand: "Ford", Models: ["Aerostar", "B-Max", "C-Max", "Cortina", "Cougar", "Edge", "Escort", "Escort Cabrio", "Escort kombi", "Explorer", "F-150", "F-250", "Fiesta", "Focus", "Focus C-Max", "Focus CC", "Focus kombi", "Fusion", "Galaxy", "Grand C-Max", "Ka", "Kuga", "Maverick", "Mondeo", "Mondeo Combi", "Mustang", "Orion", "Puma", "Ranger", "S-Max", "Sierra", "Street Ka", "Tourneo Connect", "Tourneo Custom", "Transit", "Transit", "Transit Bus", "Transit Connect LWB", "Transit Courier", "Transit Custom", "Transit kombi", "Transit Tourneo", "Transit Valnik", "Transit Van", "Transit Van 350", "Windstar"]},
                        // {brand: "Hummer", Models: ["H2", "H3"]},
                        // {brand: "Hyundai", Models: ["Accent", "Atos", "Atos Prime", "Coupé", "Elantra", "Galloper", "Genesis", "Getz", "Grandeur", "H 350", "H1", "H1 Bus", "H1 Van", "H200", "i10", "i20", "i30", "i30 CW", "i40", "i40 CW", "ix20", "ix35", "ix55", "Lantra", "Matrix", "Santa Fe", "Sonata", "Terracan", "Trajet", "Tucson", "Veloster"]},
                        // {brand: "Infiniti", Models: ["EX", "FX", "G", "G Coupé", "M", "Q", "QX"]},
                        // {brand: "Jaguar", Models: ["Daimler", "F-Pace", "F-Type", "S-Type", "Sovereign", "X-Type", "X-type Estate", "XE", "XF", "XJ", "XJ12", "XJ6", "XJ8", "XJ8", "XJR", "XK", "XK8 Convertible", "XKR", "XKR Convertible"]},
                        // {brand: "Jeep", Models: ["Cherokee", "Commander", "Compass", "Grand Cherokee", "Patriot", "Renegade", "Wrangler"]},
                        // {brand: "Nissan", Models: ["100 NX", "200 SX", "350 Z", "350 Z Roadster", "370 Z", "Almera", "Almera Tino", "Cabstar E - T", "Cabstar TL2 Valnik", "e-NV200", "GT-R", "Insterstar", "Juke", "King Cab", "Leaf", "Maxima", "Maxima QX", "Micra", "Murano", "Navara", "Note", "NP300 Pickup", "NV200", "NV400", "Pathfinder", "Patrol", "Patrol GR", "Pickup", "Pixo", "Primastar", "Primastar Combi", "Primera", "Primera Combi", "Pulsar", "Qashqai", "Serena", "Sunny", "Terrano", "Tiida", "Trade", "Vanette Cargo", "X-Trail"]},
                        // {brand: "Volvo", Models: ["240", "340", "360", "460", "850", "850 kombi", "C30", "C70", "C70 Cabrio", "C70 Coupé", "S40", "S60", "S70", "S80", "S90", "V40", "V50", "V60", "V70", "V90", "XC60", "XC70", "XC90"]},
                        // {brand: "Daewoo", Models: ["Espero", "Kalos", "Lacetti", "Lanos", "Leganza", "Lublin", "Matiz", "Nexia", "Nubira", "Nubira kombi", "Racer", "Tacuma", "Tico"]},
                        // {brand: "Fiat", Models: ["1100", "126", "500", "500L", "500X", "850", "Barchetta", "Brava", "Cinquecento", "Coupé", "Croma", "Doblo", "Doblo Cargo", "Doblo Cargo Combi", "Ducato", "Ducato Van", "Ducato Kombi", "Ducato Podvozok", "Florino", "Florino Combi", "Freemont", "Grande Punto", "Idea", "Linea", "Marea", "Marea Weekend", "Multipla", "Palio Weekend", "Panda", "Panda Van", "Punto", "Punto Cabriolet", "Punto Evo", "Punto Van", "Qubo", "Scudo", "Scudo Van", "Scudo Kombi", "Sedici", "Seicento", "Stilo", "Stilo Multiwagon", "Strada", "Talento", "Tipo", "Ulysse", "Uno", "X1/9"]},
                        // {brand: "MINI", Models: ["Cooper", "Cooper Cabrio", "Cooper Clubman", "Cooper D", "Cooper D Clubman", "Cooper S", "Cooper S Cabrio", "Cooper S Clubman", "Countryman", "Mini One", "One D"]},
                        // {brand: "Rover", Models: ["200", "214", "218", "25", "400", "414", "416", "620", "75"]},
                        {brand: "Smart", Models: ["Cabrio", "City-Coupé", "Compact Pulse", "Forfour", "Fortwo cabrio", "Fortwo coupé", "Roadster"]}
];



  cars: car[] = [
  ];

  likeCar(id:any){
    this.CarsSrv.Save_fav_ID(id);

  }

  Unlike(id:any){

   let i = this.CarsSrv.fav_ID.indexOf(id);
   this.CarsSrv.fav_ID.splice(i,1);
   this.CarsSrv.save_unlike();


    
  }


  display_filter(){
    this.content.scrollToTop(500);
    this.filter = !this.filter;

  }

  viewCars(){
    this.choosed_filter_cars = [];
    this.car_models_display = [];
    for(var i = 0; i < this.cars_info.length; i++){
      if(this.cars_info[i].brand == this.car_selected_brand){
        console.log(this.cars_info[i].Models);
        this.car_models_display = this.cars_info[i].Models;
        console.log(this.car_models_display);
      }
    }
    this.display_models = true;
    
  }

  go(id:any){
    this.CarsSrv.detail_ID = id;
    console.log(this.CarsSrv.detail_ID);
    this.router.navigateByUrl('/view-detail')
  }


  loadData(event:any){
    console.log(this.Cars[this.Cars.length-1].index);
    this.CarsSrv.getNextFirst10Rows(this.Cars[this.Cars.length-1].index).then((res)=>{
      if(res){
        this.Cars.push(...res);
      }
    });
    
    event.target.complete();

  }

  handleRefresh(event:any) {

   this.CarsSrv.getFirst10Rows().then((res)=>{
      if(res){
      this.Cars=res;
      console.log(this.Cars);  
      event.target.complete();
      }
    });
  };


}
