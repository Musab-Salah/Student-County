using Student_County.DAL;

namespace Student_County.BusinessLogic.Chat
{
    public interface IDestinationManager
    {
        List<ChatEntity> GetAll();
        void Delete(int id);
        ChatEntity GetChat(int id);
        ChatEntity CreateUpdate(DestinationBo bo, int id = 0);
    }
}
