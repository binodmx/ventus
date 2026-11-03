import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { OutputsComponent } from './outputs/outputs.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { SelectBuildMethodComponent } from './select-build-method/select-build-method.component';
import { InputParamsType1Component } from './input-params-type1/input-params-type1.component';
import { InputParamsType2Component } from './input-params-type2/input-params-type2.component';
import { OutputResultsType1Component } from './output-results-type1/output-results-type1.component';
import { OutputResultsType2Component } from './output-results-type2/output-results-type2.component';
import { DrawSceneComponent } from './draw-scene/draw-scene.component';
import { DrawContractionComponent } from './draw-contraction/draw-contraction.component';
import { DrawTestSectionComponent } from './draw-test-section/draw-test-section.component';
import { DrawDiffuserComponent } from './draw-diffuser/draw-diffuser.component';
import { InputParamsType3Component } from './input-params-type3/input-params-type3.component';
import { OutputResultsType3Component } from './output-results-type3/output-results-type3.component';
import { HsDataComponent } from './hs-data/hs-data.component';
import { InputParamsType4Component } from './input-params-type4/input-params-type4.component';
import { OutputResultsType4Component } from './output-results-type4/output-results-type4.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    OutputsComponent,
    HomeComponent,
    SelectBuildMethodComponent,
    InputParamsType1Component,
    InputParamsType2Component,
    OutputResultsType1Component,
    OutputResultsType2Component,
    DrawSceneComponent,
    DrawContractionComponent,
    DrawTestSectionComponent,
    DrawDiffuserComponent,
    InputParamsType3Component,
    OutputResultsType3Component,
    HsDataComponent,
    InputParamsType4Component,
    OutputResultsType4Component,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
