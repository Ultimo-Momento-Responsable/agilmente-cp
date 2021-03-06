import { Component, OnInit } from '@angular/core';
import { Patient, PatientsApiService } from '../../patients/shared-patients/services/patients-api/patients-api.service';
import { GamesApiService } from 'src/app/games/services/games-api.service';
import { PlanningApiService } from '../services/planning-api.service';
import { ModalController } from '@ionic/angular';
import { DialogsComponent } from '../../shared/components/dialogs/dialogs.component';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DifficultyCalcService } from '../services/difficulty-calc.service';

@Component({
  selector: 'app-edit-planning',
  templateUrl: './edit-planning.page.html',
  styleUrls: ['./edit-planning.page.scss'],
})
export class EditPlanningPage implements OnInit {

  constructor(
    private patientsApiService: PatientsApiService,
    private gamesApiService: GamesApiService,
    private planningApiService: PlanningApiService,
    private difficultyService: DifficultyCalcService,
    public modalCtrl: ModalController,
    private dialogsComponent: DialogsComponent,
    private route: ActivatedRoute) { }

  patients: Patient[];
  planningList: any[];
  id: number;
  patientId: number;
  planningName: string;
  auxGames: any [] = [];
  auxStartDate: Date;
  auxFinishDate: Date;
  state: string;
  patientSelected: boolean = false;
  planningForm: FormGroup;
  games: any [] = [];
  assignedGames: any [] = [];
  planningGames: any [] = [];
  isClicked: boolean= false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']; 
    });
    this.patientsApiService.getActivePatients().subscribe(res=>{
      this.patients = res;
    });
    let i = 0;
    this.gamesApiService.getGames().subscribe(res=>{
      res.forEach(g => {
        this.games.push(g);
        let contType0 = 0;
        let contActivatable = 0;
        this.games[i].gameParam.forEach(p => {
          p.isActive = false;
          if (p.param.type == 0) {
            contType0++;
          }
          if (p.param.type == 1) {
            contActivatable++;
            p.value=false;
          }
          if (p.param.type == 2) {
            contActivatable++;
            p.value=1;
          }
          if (p.param.type == 3) {
            p.value=((p.minValue + p.maxValue) / 2).toFixed(0);
          }
        });
        this.games[i].maxNumberOfSessions = 5;
        this.games[i].hasLimit = false;
        this.games[i].index = null;
        if (contType0==1) {
          this.games[i].index = 0;
          this.games[i].gameParam.find(p => p.param.type === 0).isActive = true;
        }
        this.games[i].done = false;
        this.games[i].hasActivatable = (contActivatable > 0);
        i++;
      });
    });
    this.planningForm = new FormGroup({
      patient: new FormControl('', Validators.required),
      planningName: new FormControl(''),
      professionalName: new FormControl(''),
      startDate: new FormControl('', Validators.required),
      finishDate: new FormControl('', Validators.required),
      games: new FormControl('', Validators.required)
    });
    this.planningForm.patchValue({"games": null});
    this.loadPlanning();
  }

  /**
   * Obtiene los datos de una planning y precarga los datos
   */
   loadPlanning(){
    this.planningApiService.getPlanningById(this.id).subscribe(res => {
      this.patientId = res.patientId;
      this.planningName = res.planningName;
      this.state = res.stateName;
      this.planningList = res.planningList;
      this.planningForm.setValue({
        patient: res.patientFirstName + " " + res.patientLastName,
        planningName: res.planningName,
        professionalName: res.professionalFirstName + " " + res.professionalLastName,
        startDate: res.startDate,
        finishDate: res.dueDate,
        games: null
      });
      this.auxStartDate = res.startDate;
      this.auxFinishDate = res.dueDate;
      this.editPlanning();
    })
  }

  /**
   * Se prepara el formulario para su edici??n.
   */
   editPlanning(){
    if (this.state=="Pendiente"){
      for (let i=0; i<this.planningList.length; i++){
        this.assignedGames.push(JSON.parse(JSON.stringify(this.games.find(game => game.name == this.planningList[i].game))));
        let index = 1;
        this.assignedGames[i].gameParam.forEach(p => {
          let planningParam = this.planningList[i].parameters.find(param => param.spanishName == p.param.name);
          if (planningParam){
            if (p.param.type==0){
              if (p.param.id==1){
                index = 0;
              }
            }
            p.isActive = true;
            if (!isNaN(parseFloat(planningParam.value)) && isFinite(planningParam.value)){
              p.value = Math.floor(planningParam.value).toString();
            }else{
              if (planningParam.value=="false"){
                p.value = false;
              }else if (planningParam.value=="true"){
                p.value = true;
              }else{
                p.value = planningParam.value;
              }
            }
          }
        });
        this.assignedGames[i].index = index;
        this.assignedGames[i].done = true;
        this.assignedGames[i].accordion = false;
        if (this.planningList[i].numberOfSession >= 0) {
          this.assignedGames[i].maxNumberOfSessions = this.planningList[i].numberOfSession;
          this.assignedGames[i].hasLimit = true;
        } else {
          this.assignedGames[i].maxNumberOfSessions = 5;
          this.assignedGames[i].hasLimit = false
        }
        this.assignedGames[i].difficulty = "custom";
      }
      this.auxGames = JSON.parse(JSON.stringify(this.assignedGames));
      this.planningGames = JSON.parse(JSON.stringify(this.assignedGames));
      this.planningForm.patchValue({"games": null});
    }
  }

  /**
   * llena el nombre de planificaci??n traido del componente hijo
   * @param name nombre de la planificaci??n
   */
  fillPlanningName(name: string) {
    this.planningForm.patchValue({"planningName": name})
  }

  /**
   * llena la fecha de inicio de la planning
   * @param startDate fecha de inicio de la planning
   */
  fillStartDate(startDate: string) {
    this.planningForm.patchValue({"startDate": startDate})
  }

  /**
   * llena la fecha de fin de la planning
   * @param finishDate fecha de fin de la planning
   */
  fillFinishDate(finishDate: string) {
    this.planningForm.patchValue({"finishDate": finishDate})
  }

  /**
   * pone en null a games.
   */
  fillWithNullGames() {
    this.planningForm.patchValue({"games": null});
  }

  /**
   * Trae los juegos asignados del componente hijo
   * @param games juegos asignados
   */
  fillAssignedGames(games: any[]) {
    this.assignedGames = games;
  }

  /**
   * Trae los juegos planeados del componente hijo
   * @param games juegos planeados
   */
  fillPlanningGames(games: any[]) {
    this.planningGames = games;
  }

  /**
   * Chequea que el paciente que se est?? buscando existe
   * @returns true o false si existe o no.
   */
  patientExists(){
    let exists = false;
    this.patients?.forEach(p => {
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase())==this.planningForm.value.patient.toLowerCase()){
        exists = true;
      }
    });
    return exists
  }
 
  /**
   * Se formatea y se env??a la planificaci??n al back
   */
  save(myForm: FormGroup) {
    this.isClicked = true;
    let patientId: number;
    this.patients.forEach(p=>{
      if ((p.firstName.toLowerCase() + " " + p.lastName.toLowerCase()) == this.planningForm.value.patient.toLowerCase()){
        patientId = p.id;
      }
    });
    let gamesPost: any[] = [];
    this.assignedGames.forEach(g => {
      let gamePost = {
        gameId: g.id,
        maxNumberOfSessions: g.hasLimit?g.maxNumberOfSessions:-1,
        params: undefined,
        difficulty: undefined
      };
      
      let params: any = {};

      g.gameParam.forEach(p => {
        if (p.isActive) {
          let newParam = {[p.param.className]: p.value}
          params = {...params,...newParam}
        }
      });
      gamePost.params = params;
      gamePost.difficulty = this.difficultyService.getDifficulty(g);
      gamesPost.push(gamePost);
    })
    if (myForm.valid) {
      let jsonPost = {
        patientId: patientId,
        stateId: 1,
        professionalId: window.localStorage.getItem('professionalId'),
        planningName: myForm.value.planningName,
        startDate: myForm.value.startDate,
        dueDate: myForm.value.finishDate,
        games: gamesPost
      }
      if (this.state == "Vigente") {
        this.planningApiService.editPlanning(jsonPost,this.id).subscribe(()=> {
          this.dialogsComponent.presentAlert('??Planificaci??n Editada!',"",'La planificaci??n ha sido editada correctamente.',"/planning",false); 
        }, () => {
          this.dialogsComponent.presentAlert('Error',"",'Un error ha ocurrido, por favor int??ntelo de nuevo m??s tarde.',"", false);
          this.isClicked = false;
        });
      } else {
        this.planningApiService.cancelPlanningById(this.id).subscribe(() => {
          this.planningApiService.postPlanning(jsonPost).subscribe(() =>{
            this.dialogsComponent.presentAlert('??Planificaci??n Editada!',"",'La planificaci??n ha sido editada correctamente.',"/planning",false); 
          }, () => {
            this.dialogsComponent.presentAlert('Error',"",'Un error ha ocurrido, por favor int??ntelo de nuevo m??s tarde.',"", false);
            this.isClicked = false;
          });
        }, () => {
          this.dialogsComponent.presentAlert('Error',"",'Un error ha ocurrido, por favor int??ntelo de nuevo m??s tarde.',"", false);
          this.isClicked = false;
        });
      }
    };
  }

  /**
   * Habilita o desabilita el bot??n de submit
   * @returns true o false seg??n corresponda.
   */
  submitDisabled(){
    if (this.state=="Pendiente"){
      let gamesAreDone = true;
      if (this.planningGames.length == 0){
        gamesAreDone = false;
      }
      this.planningGames.forEach(g => {
        if (!g.done){
          gamesAreDone = false;
        }
      })
      if (gamesAreDone){
        this.planningForm.patchValue({"games": "ok"});
      } else {
        this.planningForm.patchValue({"games": null});
      }
    } else {
      this.planningForm.patchValue({"games": "ok"});
    }
    
    console.log(this.isClicked)
    return !this.planningForm.valid 
    || !this.patientExists() 
    || (JSON.stringify(this.assignedGames)==JSON.stringify(this.auxGames) 
      && this.planningName==this.planningForm.value.planningName
      && this.auxFinishDate==this.planningForm.value.finishDate
      && this.auxStartDate==this.planningForm.value.startDate);
  }
}
