function skillsMember() {
    return {
        restrict: `E`,
        templateURL: `modules/skills/views/member.html`,
        controllerAs: `vm`,
        bindToController: true,
        scope: {
            member: '='
        }
    };
}