using Student_County.DAL;

namespace Student_County.BusinessLogic.Tools
{
    public static class ToolsMapping
    {
        public static ToolsEntity? MapBoToEntity(this ToolsBo bo)
        {
            if (bo == null) return null;
            return new ToolsEntity
            {
                Id = bo.Id,
                Name = bo.Name,
                TheWay = bo.TheWay,
                Price = bo.Price,
                Description = bo.Description,
                StudentId = bo.StudentId,        
            };
        }
    }
}
