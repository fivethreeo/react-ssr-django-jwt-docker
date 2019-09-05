
import graphene

from gjwt_auth.mutations import (
    Activate,
    DeleteAccount,
    Login,
    RefreshToken,
    Register,
    ResetPassword,
    ResetPasswordConfirm,
)

from djangoapi.todos.schema import CreateTodo, UpdateTodo, DeleteTodo, Query

from gjwt_auth.schema import User, Viewer


class RootQuery(Query, graphene.ObjectType):
    viewer = graphene.Field(Viewer)

    def resolve_viewer(self, info, **kwargs):
        if info.context.user.is_authenticated:
            return info.context.user
        return None


class Mutation(graphene.ObjectType):
    activate = Activate.Field()
    login = Login.Field()
    register = Register.Field()
    deleteAccount = DeleteAccount.Field()
    refreshToken = RefreshToken.Field()
    resetPassword = ResetPassword.Field()
    resetPasswordConfirm = ResetPasswordConfirm.Field()
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()

schema = graphene.Schema(query=RootQuery, mutation=Mutation)
