import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { DashboardComponent } from "./Dashboard/DashboardComponent";
import { EditorComponent } from "./Editor/EditorComponent";
import { NotFoundComponent } from "./NotFoundComponent";
import { LearningComponent } from "./Learning/LearningComponent";
import { SettingsComponent } from "./Settings/SettingsComponent";

export class MainComponent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={(props) => <DashboardComponent {...props} uid={this.props.uid} />} />
                    <Route exact path="/editing" render={(props) => <DashboardComponent {...props} uid={this.props.uid} />} />
                    <Route path="/editing/:folderId/:cardId" render={(props) => <EditorComponent {...props} uid={this.props.uid} />} />
                    <Route path="/learning" component={LearningComponent} />
                    <Route path="/settings" render={(props) => <SettingsComponent {...props} deleteUser={this.props.deleteUser} />} />
                    <Route component={NotFoundComponent} />
                </Switch>
            </div>
        )
    };
    // TODO: Bessere Alternative zum Durchreichen von Properties? (Settings) eventuell Redux Store??

}

